from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from user.api.serializers.register import RegisterSerializer
from user.models import CustomUser


class RegisterView(CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer