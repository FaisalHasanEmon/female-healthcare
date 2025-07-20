from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from user.api.serializers.register import RegisterSerializer
from user.models import CustomUser
from rest_framework.response import Response
from rest_framework import status




class RegisterView(CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            "message": "User registered successfully.",
            "user": {
                "email": user.email,
            }
        }, status=status.HTTP_201_CREATED)
    