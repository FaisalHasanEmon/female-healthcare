from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from user.api.serializers.login import LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': user.email,
            "detais": "Login successful"
        })