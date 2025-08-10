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
            "latest_response": response
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


    # def post(self, request):
    #     data = request.data
    #     has_regular_cycle = data.get('has_regular_cycle')
    #     current_phase = data.get('current_phase')
    #     symptoms = data.get('symptoms', [])
    #     dietary_style = data.get('dietary_style')
    #     activity_level = data.get('activity_level')
    #     stress_level = data.get('stress_level')
    #     goals = data.get('goals', [])

    #     # Validate required fields
    #     if not has_regular_cycle or not current_phase:
    #         return Response({"error": "Cycle and phase are required"}, status=status.HTTP_400_BAD_REQUEST)

    #     # Validate phase
    #     valid_phases = [choice[1] for choice in CycleInfo.CYCLE_CHOICES]
    #     print(f"Valid phases: {valid_phases}")
    #     print(f"Current phase: {current_phase.lower()}")
    #     if current_phase.lower() not in valid_phases:
    #         return Response({"error": f"Invalid phase. Choose from: {', '.join(valid_phases)}"}, status=status.HTTP_400_BAD_REQUEST)

    #     # Check for user profile
    #     try:
    #         profile = self.request.user.profile
    #         print(f"Profile ID: {profile.id}")
    #         if not profile.id:
    #             raise ValueError("Profile ID is None or invalid")
    #     except (AttributeError, ValueError) as e:
    #         print(f"Error: {str(e)}")
    #         return Response(
    #             {"error": "User profile not found. Please complete profile setup."},
    #             status=status.HTTP_400_BAD_REQUEST
    #         )

    #     # Validate related objects
    #     try:
    #         for symptom_id in symptoms:
    #             Symptom.objects.get(id=symptom_id)
    #         if dietary_style:
    #             DietaryStyle.objects.get(id=dietary_style)
    #         for goal_id in goals:
    #             Goal.objects.get(id=goal_id)
    #     except ObjectDoesNotExist as e:
    #         print(f"Invalid related object: {str(e)}")
    #         return Response({"error": f"Invalid related object ID: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

    #     # Validate and save onboarding data
    #     try:
    #         onboarding_data = {
    #             'profile': profile.id,
    #             'has_regular_cycle': has_regular_cycle == 'Yes' or has_regular_cycle is True,  # Handle boolean input
    #             'symptoms': symptoms,
    #             'dietary_styles': [dietary_style] if dietary_style else [],
    #             'activity_level': activity_level,
    #             'stress_level': stress_level,
    #             'goals': goals
    #         }
    #         print(f"Onboarding data: {onboarding_data}")
    #         onboarding_serializer = OnboardingSerializer(data=onboarding_data)
    #         if onboarding_serializer.is_valid():
    #             onboarding_serializer.save()
    #         else:
    #             print(f"Onboarding serializer errors: {onboarding_serializer.errors}")
    #             return Response(onboarding_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #         # Validate and save cycle info
    #         cycle_info_data = {
    #             'profile': profile.id,
    #             'current_phase': current_phase.lower()
    #         }
    #         print(f"Cycle info data: {cycle_info_data}")
    #         cycle_info_serializer = CycleInfoSerializer(data=cycle_info_data)
    #         if cycle_info_serializer.is_valid():
    #             cycle_info_serializer.save()
    #         else:
    #             print(f"Cycle info serializer errors: {cycle_info_serializer.errors}")
    #             return Response(cycle_info_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #         # Generate insights if cycle and phase are valid
    #         if has_regular_cycle == 'Yes' or has_regular_cycle is True:
    #             insight = openai_config.generate_insight(cycle=has_regular_cycle, phase=current_phase, context=pdf_content)
    #             if "Sorry, I couldn't" in insight:
    #                 print(f"Insight error: {insight}")
    #                 return Response(
    #                     {"error": "Failed to generate insight. Please check API configuration."},
    #                     status=status.HTTP_500_INTERNAL_SERVER_ERROR
    #                 )
    #             goal = openai_config.get_goal(cycle=has_regular_cycle, phase=current_phase, context=pdf_content)
    #             if "Sorry, I couldn't" in goal:
    #                 print(f"Goal error: {goal}")
    #                 return Response(
    #                     {"error": "Failed to generate goal response. Please check API configuration."},
    #                     status=status.HTTP_500_INTERNAL_SERVER_ERROR
    #                 )
    #             food = openai_config.get_food(cycle=has_regular_cycle, phase=current_phase, context=pdf_content)
    #             if "Sorry, I couldn't" in food:
    #                 print(f"Food error: {food}")
    #                 return Response(
    #                     {"error": "Failed to generate food suggestions. Please check API configuration."},
    #                     status=status.HTTP_500_INTERNAL_SERVER_ERROR
    #                 )
    #             supplement = openai_config.get_supplement(cycle=has_regular_cycle, phase=current_phase, context=pdf_content)
    #             if "Sorry, I couldn't" in supplement:
    #                 print(f"Supplement error: {supplement}")
    #                 return Response(
    #                     {"error": "Failed to generate supplement suggestions. Please check API configuration."},
    #                     status=status.HTTP_500_INTERNAL_SERVER_ERROR
    #                 )

    #             return Response({
    #                 "fenyx_insight": insight,
    #                 "goal_response": goal,
    #                 "food_suggestions": food,
    #                 "supplement_suggestions": supplement
    #             }, status=status.HTTP_200_OK)
    #         else:
    #             return Response({"error": "Invalid cycle or phase selection"}, status=status.HTTP_400_BAD_REQUEST)

    #     except Exception as e:
    #         print(f"Dashboard error: {str(e)}")
    #         return Response({"error": f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        