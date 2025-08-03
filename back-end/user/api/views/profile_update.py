from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from user.api.serializers import UserProfileUpdateSerializer
from rest_framework.response import Response
from django.utils import timezone
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from rest_framework.views import APIView
from user.utils import send_verification_email
from django.shortcuts import render


User = get_user_model()


class UserProfileUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileUpdateSerializer
    permission_classes = [permissions.IsAuthenticated]
    http_method_names = ['get', 'patch']

    def get_object(self):
        # Return the user object for the authenticated user
        return self.request.user

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(
            instance,
            data=request.data,
            partial=True
        )
        try:
            serializer.is_valid(raise_exception=True)
            if 'email' in serializer.validated_data:
                return Response(
                    {"detail": "Use 'new_email' to change email."},
                    status=400
                )
            serializer.save()
        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response({"error": str(e)}, status=500)

        if instance.new_email:
            return Response(
                {"detail": "Update successful. Confirm the change from your current email."}  # noqa
            )
        return Response({"detail": "Profile updated."})


class VerifyEmailChangeView(APIView):
    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError):
            return Response({"error": "Invalid link"}, status=400)

        if not default_token_generator.check_token(user, token):
            return Response({"error": "Expired or invalid token."}, status=400)

        if (timezone.now() - user.email_change_requested_at).days > 1:
            return Response(
                {"error": "Token expired. Request again."},
                status=400
            )

        old_email = user.email
        new_email = user.new_email
        user.email = new_email
        user.email_verified = False
        user.new_email = None
        user.email_change_token = None
        user.email_change_requested_at = None
        user.save()

        self._notify_old_email(old_email, new_email)
        self._send_new_email_verification(user, request)
        # return Response(
        # {"message": "Email changed. Verification sent to new email."})
        context = {"message": "Email verified successfully."}
        return render(request, "email_verification_result.html", context)

    def _notify_old_email(self, old_email, new_email):
        print(f"Notifying old email: {old_email} about change to {new_email}")
        subject = "Email Changed"
        context = {'old_email': old_email, 'new_email': new_email}
        text = render_to_string(
            'email/email_change_notification.txt',
            context
        )
        html = render_to_string(
            'email/email_change_notification.html',
            context
        )

        email = EmailMultiAlternatives(
            subject,
            text,
            settings.DEFAULT_FROM_EMAIL,
            [old_email]
        )
        email.attach_alternative(html, "text/html")
        email.send()

    def _send_new_email_verification(self, user, request):
        print(f"Sending verification to new email: {user.new_email}")
        user.email_verified = False
        user.save()
        send_verification_email(user, request)
