from django.views.generic import TemplateView


class PasswordResetConfirmPageView(TemplateView):
    template_name = "email/confirm_password.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['uidb64'] = kwargs['uidb64']
        context['token'] = kwargs['token']
        return context