from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from user.models import Profile
from user.api.serializers.profile import ProfileSerializer


class ProfileListView(ListCreateAPIView):
    serializer_class = ProfileSerializer
    model = Profile
    