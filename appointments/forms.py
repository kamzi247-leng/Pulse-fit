from django import forms
from django.utils import timezone
from .models import Appointment, Service


class AppointmentForm(forms.ModelForm):
    class Meta:
        model = Appointment
        fields = [
            "service", "customer_name", "customer_email",
            "customer_phone", "date", "start_time", "notes",
        ]
        widgets = {
            "date": forms.DateInput(attrs={"type": "date"}),
            "start_time": forms.TimeInput(attrs={"type": "time"}),
            "notes": forms.Textarea(attrs={"rows": 3}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["service"].queryset = Service.objects.filter(is_active=True)
        for field in self.fields.values():
            field.widget.attrs.setdefault("class", "form-control")

    def clean_date(self):
        date = self.cleaned_data["date"]
        if date < timezone.localdate():
            raise forms.ValidationError("You can't book an appointment in the past.")
        return date

    def clean(self):
        """
        Run the model's own .clean() (double-booking check) as part of
        form validation, so the error shows up nicely on the form
        instead of crashing when .save() is called.
        """
        cleaned_data = super().clean()
        instance = Appointment(**{
            k: v for k, v in cleaned_data.items() if k in
            ["service", "customer_name", "customer_email", "customer_phone",
             "date", "start_time", "notes"]
        })
        try:
            instance.clean()
        except forms.ValidationError as e:
            raise forms.ValidationError(e.message)
        return cleaned_data
