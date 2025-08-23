from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from user.api.serializers.login import LoginSerializer
from user.utils import send_verification_email
from user.models import Onboarding, Profile


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        if not user.email_verified:
            send_verification_email(user, request)
            raise AuthenticationFailed(
                "Please verify your email before logging in."
            )
        
        refresh = RefreshToken.for_user(user)

        # check onboarding status
        has_onboarding = False
        try:
            profile = user.profile
            has_onboarding = Onboarding.objects.filter(profile=profile).exists()
        except Profile.DoesNotExist:
            has_onboarding = False
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            "massage": "Login successful",
            "onboarding_completed": has_onboarding,
            # 'user': {
            #     'id': user.id,
            #     'email': user.email,
            #     'email_verified': user.email_verified,
            #     'password': request.data.get('password'),
            #     # Add more fields if needed (e.g., name)
            # },
        })