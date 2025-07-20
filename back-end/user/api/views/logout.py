from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.exceptions import TokenError

# class LogoutView(APIView):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         try:
#             token = RefreshToken(request.data.get('refresh'))
#             token.blacklist()
            
#             return Response({"detais": "Logout successful"},status=status.HTTP_205_RESET_CONTENT)
#         except Exception:
#             return Response(status=status.HTTP_400_BAD_REQUEST)
        

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh")
        if not refresh_token:
            return Response({"error": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Logout successful."}, status=status.HTTP_205_RESET_CONTENT)
        except TokenError as e:
            return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "Something went wrong."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

