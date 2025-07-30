from django import forms
from user.models import Onboarding


class OnboardingAdminForm(forms.ModelForm):
    class Meta:
        model = Onboarding
        fields = '__all__'

    def clean_symptoms(self):
        symptoms = self.cleaned_data.get('symptoms')
        if symptoms and len(symptoms) >= 4:
            raise forms.ValidationError("You can select fewer than 4 symptoms.")
        return symptoms
