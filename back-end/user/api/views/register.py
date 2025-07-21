from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from user.api.serializers.register import RegisterSerializer
from user.models import CustomUser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError


class RegisterView(CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as exc:
            errors = exc.detail

            if isinstance(errors, dict) and 'email' in errors:
                return Response(
                    {"error": "user with this email already exists."},
                    status=400
                )

            return Response({"error": errors}, status=400)

        user = serializer.save()
        return Response({
            "message": "User registered successfully.",
            "user": {
                "email": user.email,
            }
        }, status=status.HTTP_201_CREATED)
