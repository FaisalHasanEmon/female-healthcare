import re
from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

class StrongPasswordValidator:
    def validate(self, password, user=None):
        if not re.findall(r'[A-Z]', password):
            raise ValidationError(_("Password must contain at least one uppercase letter."), code='no_upper')
        if not re.findall(r'[a-z]', password):
            raise ValidationError(_("Password must contain at least one lowercase letter."), code='no_lower')
        if not re.findall(r'\d', password):
            raise ValidationError(_("Password must contain at least one digit."), code='no_digit')
        if not re.findall(r'[()[\]{}|\\`~!@#$%^&*_\-+=;:\'",<>./?]', password):
            raise ValidationError(_("Password must contain at least one special character."), code='no_special')

    def get_help_text(self):
        return _("Your password must contain at least one uppercase, one lowercase letter, one number, and one special character.")
