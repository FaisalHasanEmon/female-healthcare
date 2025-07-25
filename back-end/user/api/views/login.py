from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from user.api.serializers.login import LoginSerializer
from user.utils import send_verification_email


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        if not user.email_verified:
            send_verification_email(user, request)
            raise AuthenticationFailed("Please verify your email before logging in.")
        
        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user.id,
                'email': user.email,
                'email_verified': user.email_verified
                # Add more fields if needed (e.g., name)
            },
            "details": "Login successful"
        })