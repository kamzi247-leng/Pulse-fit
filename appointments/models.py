from django.db import models
from django.core.exceptions import ValidationError
from django.urls import reverse


class Service(models.Model):
    """
    A bookable service offered by the business.
    Example (hair salon): 'Haircut', 'Coloring', 'Blowout'
    Example (tutoring):   '1-hour Math Session', 'SAT Prep'
    Example (consulting): '30-min Discovery Call', 'Strategy Session'
    """
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    duration_minutes = models.PositiveIntegerField(default=30)
    price = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return f"{self.name} ({self.duration_minutes} min)"


class Appointment(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("cancelled", "Cancelled"),
        ("completed", "Completed"),
    ]

    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="appointments")
    customer_name = models.CharField(max_length=150)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=20, blank=True)
    date = models.DateField()
    start_time = models.TimeField()
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["date", "start_time"]
        constraints = [
            models.UniqueConstraint(fields=["date", "start_time"], name="unique_slot")
        ]

    def __str__(self):
        return f"{self.customer_name} - {self.service.name} on {self.date} at {self.start_time}"

    def clean(self):
        conflict = Appointment.objects.filter(
            date=self.date, start_time=self.start_time
        ).exclude(status="cancelled").exclude(pk=self.pk)
        if conflict.exists():
            raise ValidationError("That time slot is already booked. Please choose another.")

    def get_absolute_url(self):
        return reverse("appointment-confirmed", args=[self.pk])
