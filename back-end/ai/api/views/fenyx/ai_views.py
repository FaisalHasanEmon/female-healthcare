from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from user.onboarding.onboarding_model import (
    Symptom,
    DietaryStyle,
    Goal,
    ActivityLevel,
    StressLevel,
)
from ai.api.serializers.fenyx.ai_serializers import (
    OnboardingSerializer,
    CycleInfoSerializer
)
from user.models import CycleInfo, Onboarding
from .prompt import OpenAIConfig
import fitz  # PyMuPDF
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist



# Initialize OpenAI configuration
api_key = settings.FENYX_OPENAI_API_KEY
openai_config = OpenAIConfig(api_key=api_key)

# Load PDF content
pdf_content = ""
pdf_path = '/home/shagor-robidas/Desktop/jvai_project/female-healthcare/back-end/pdfs/AI_Women.pdf'


def extract_text_from_pdf(pdf_path):
    global pdf_content
    with open(pdf_path, "rb") as file:
        pdf_data = file.read()
        doc = fitz.open(stream=pdf_data, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        pdf_content = text


extract_text_from_pdf(pdf_path)


class AICoachView(APIView):
    def post(self, request):
        """
        Handle user interaction with the AI coach.
        Expects 'user_input' in the request data.
        Returns AI response based on user input and PDF context.
        """
        user_input = request.data.get('user_input')
        if not user_input:
            return Response(
                {"error": "User input is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not hasattr(self, 'messages_ai_coach'):
            self.messages_ai_coach = []

        # Append user message
        self.messages_ai_coach.append({"role": "user", "content": user_input})

        # Get AI response
        response = openai_config.get_response(user_input, context=pdf_content)

        # Append AI response
        self.messages_ai_coach.append(
            {"role": "assistant", "content": response}
        )

        # Return the conversation history
        return Response({
            "messages": self.messages_ai_coach,
            # "latest_response": response
        }, status=status.HTTP_200_OK)


class DashboardView(APIView):

    def get(self, request):
        try:
            # Get the authenticated user's profile
            profile = request.user.profile
            if not profile.id:
                return Response(
                    {"error": "User profile not found. Please complete profile setup."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Fetch Onboarding data
            try:
                onboarding = Onboarding.objects.get(profile=profile)
                has_regular_cycle = onboarding.has_regular_cycle
                symptoms = list(onboarding.symptoms.values_list('id', flat=True))
                dietary_styles = list(onboarding.dietary_styles.values_list('id', flat=True))
                activity_level = onboarding.activity_level.id if onboarding.activity_level else None
                stress_level = onboarding.stress_level.id if onboarding.stress_level else None
                goals = list(onboarding.goals.values_list('id', flat=True))
            except Onboarding.DoesNotExist:
                return Response(
                    {"error": "Onboarding data not found. Please complete onboarding."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Fetch CycleInfo data
            try:
                cycle_info = CycleInfo.objects.get(profile=profile)
                current_phase = cycle_info.current_phase
            except CycleInfo.DoesNotExist:
                return Response(
                    {"error": "Cycle information not found. Please provide cycle details."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Validate phase
            valid_phases = [choice[1] for choice in CycleInfo.CYCLE_CHOICES]
            if current_phase.lower() not in valid_phases:
                return Response(
                    {"error": f"Invalid phase. Choose from: {', '.join(valid_phases)}"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Initialize OpenAIConfig
            openai_config = OpenAIConfig()
            pdf_content = ""  # Replace with actual PDF content if available

            # Generate insights if cycle and phase are valid
            if has_regular_cycle:
                insight = openai_config.generate_insight(
                    cycle="Yes" if has_regular_cycle else "No",
                    phase=current_phase,
                    context=pdf_content
                )
                if "Sorry, I couldn't" in insight:
                    return Response(
                        {"error": "Failed to generate insight. Please check API configuration."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )

                goal = openai_config.get_goal(
                    cycle="Yes" if has_regular_cycle else "No",
                    phase=current_phase,
                    context=pdf_content
                )
                if "Sorry, I couldn't" in goal:
                    return Response(
                        {"error": "Failed to generate goal response. Please check API configuration."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )

                food = openai_config.get_food(
                    cycle="Yes" if has_regular_cycle else "No",
                    phase=current_phase,
                    context=pdf_content
                )
                if "Sorry, I couldn't" in food:
                    return Response(
                        {"error": "Failed to generate food suggestions. Please check API configuration."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )

                supplement = openai_config.get_supplement(
                    cycle="Yes" if has_regular_cycle else "No",
                    phase=current_phase,
                    context=pdf_content
                )
                if "Sorry, I couldn't" in supplement:
                    return Response(
                        {"error": "Failed to generate supplement suggestions. Please check API configuration."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )

                # Return the dashboard data with insights
                return Response({
                    "profile": {
                        "email": request.user.email,
                        "name": profile.name
                    },
                    "onboarding": {
                        "has_regular_cycle": has_regular_cycle,
                        "symptoms": symptoms,
                        "dietary_styles": dietary_styles,
                        "activity_level": activity_level,
                        "stress_level": stress_level,
                        "goals": goals
                    },
                    "cycle_info": {
                        "current_phase": current_phase
                    },
                    "fenyx_insight": insight,
                    "goal_response": goal,
                    "food_suggestions": food,
                    "supplement_suggestions": supplement
                }, status=status.HTTP_200_OK)

            else:
                return Response(
                    {"error": "Invalid cycle or phase selection"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        except Exception as e:
            print(f"Dashboard error: {str(e)}")
            return Response(
                {"error": f"An error occurred: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


def get_user_cycle_context(request):
    """Fetch and validate user profile, onboarding, and cycle info."""
    try:
        profile = request.user.profile
    except Exception:
        return None, Response(
            {"error": "User profile not found. Please complete profile setup."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        onboarding = Onboarding.objects.get(profile=profile)
        has_regular_cycle = onboarding.has_regular_cycle
    except Onboarding.DoesNotExist:
        return None, Response(
            {"error": "Onboarding data not found. Please complete onboarding."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        cycle_info = CycleInfo.objects.get(profile=profile)
        current_phase = cycle_info.current_phase
    except CycleInfo.DoesNotExist:
        return None, Response(
            {"error": "Cycle information not found. Please provide cycle details."},
            status=status.HTTP_400_BAD_REQUEST
        )

    # Validate phase
    valid_phases = [choice[1] for choice in CycleInfo.CYCLE_CHOICES]
    if current_phase.lower() not in valid_phases:
        return None, Response(
            {"error": f"Invalid phase. Choose from: {', '.join(valid_phases)}"},
            status=status.HTTP_400_BAD_REQUEST
        )

    return {
        "profile": profile,
        "cycle": "Yes" if has_regular_cycle else "No",
        "phase": current_phase,
        "context": ""  # later you can replace with actual PDF context
    }, None


# ---- Individual Views ----
class InsightView(APIView):
    def get(self, request):
        data, error = get_user_cycle_context(request)
        if error:
            return error
        openai_config = OpenAIConfig()
        insight = openai_config.generate_insight(
            cycle=data["cycle"],
            phase=data["phase"],
            context=data["context"]
        )
        if "Sorry, I couldn't" in insight:
            return Response({"error": "Failed to generate insight."}, status=500)
        return Response({"fenyx_insight": insight}, status=200)


class GoalView(APIView):
    def get(self, request):
        data, error = get_user_cycle_context(request)
        if error:
            return error
        openai_config = OpenAIConfig()
        goal = openai_config.get_goal(
            cycle=data["cycle"],
            phase=data["phase"],
            context=data["context"]
        )
        if "Sorry, I couldn't" in goal:
            return Response({"error": "Failed to generate goal."}, status=500)
        return Response({"goal_response": goal}, status=200)


class FoodView(APIView):
    def get(self, request):
        data, error = get_user_cycle_context(request)
        if error:
            return error
        openai_config = OpenAIConfig()
        food = openai_config.get_food(
            cycle=data["cycle"],
            phase=data["phase"],
            context=data["context"]
        )
        if "Sorry, I couldn't" in food:
            return Response({"error": "Failed to generate food suggestions."}, status=500)
        return Response({"food_suggestions": food}, status=200)


class SupplementView(APIView):
    def get(self, request):
        data, error = get_user_cycle_context(request)
        if error:
            return error
        openai_config = OpenAIConfig()
        supplement = openai_config.get_supplement(
            cycle=data["cycle"],
            phase=data["phase"],
            context=data["context"]
        )
        if "Sorry, I couldn't" in supplement:
            return Response({"error": "Failed to generate supplement suggestions."}, status=500)
        return Response({"supplement_suggestions": supplement}, status=200)