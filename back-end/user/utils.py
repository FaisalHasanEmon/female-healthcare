from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.urls import reverse
from django.core.mail import EmailMultiAlternatives


def generate_verification_link(user, request):
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)
    relative_link = reverse('verify-email', kwargs={'uidb64': uid, 'token': token})
    return request.build_absolute_uri(relative_link)


def send_verification_email(user, request):
    verification_link = generate_verification_link(user, request)

    subject = "Verify Your Email Address"
    from_email = "shagorrobidasjvai@gmail.com"  # ✅ Use domain email
    to_email = [user.email]

    text_content = f"Hi {user.email},\nPlease verify your email: {verification_link}"
    
    html_content = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Hello {user.email},</h2>
        <p>Thank you for registering with us. Please click the button below to verify your email address.</p>
        <p style="margin: 20px 0;">
            <a href="{verification_link}" style="padding: 12px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
                Verify Email
            </a>
        </p>
        <p>If you didn’t create an account, please ignore this message.</p>
        <p>Thanks,<br>Your App Team</p>
    </body>
    </html>
    """

    email = EmailMultiAlternatives(subject, text_content, from_email, to_email)
    email.attach_alternative(html_content, "text/html")
    email.send()
