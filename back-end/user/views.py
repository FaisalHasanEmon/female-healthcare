from django.views.generic import TemplateView
from django.http import HttpResponse

import logging
logger = logging.getLogger(__name__)


class PasswordResetConfirmPageView(TemplateView):
    template_name = "email/confirm_password.html"
    logger.info(f"This is an info message.{template_name}")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['uidb64'] = kwargs['uidb64']
        context['token'] = kwargs['token']
        return context
  

def test_view(request):
    logger.info("This is an info message.")
    logger.error("This is an error message.")
    return HttpResponse("Logging done.")
