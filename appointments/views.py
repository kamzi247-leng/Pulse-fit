from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.urls import reverse
from .models import Service, Appointment
from .forms import AppointmentForm


def home(request):
    services = Service.objects.filter(is_active=True)
    return render(request, "home.html", {"services": services})


def book_appointment(request):
    if request.method == "POST":
        form = AppointmentForm(request.POST)
        if form.is_valid():
            appointment = form.save()
            messages.success(request, "Your appointment request was submitted!")
            return redirect("appointment-confirmed", pk=appointment.pk)
    else:
        form = AppointmentForm()
    return render(request, "book_appointment.html", {"form": form})


def appointment_confirmed(request, pk):
    appointment = get_object_or_404(Appointment, pk=pk)
    return render(request, "appointment_confirmed.html", {"appointment": appointment})


def my_appointments(request):
    """
    Look up appointments by email. No login system required, which keeps
    things simple for a first version, at the cost of not being private -
    swap this for Django's built-in auth once you need real accounts.
    """
    appointments = None
    email = request.GET.get("email", "").strip()
    if email:
        appointments = Appointment.objects.filter(customer_email__iexact=email)
    return render(request, "my_appointments.html", {
        "appointments": appointments,
        "email": email,
    })


def cancel_appointment(request, pk):
    appointment = get_object_or_404(Appointment, pk=pk)
    if request.method == "POST":
        appointment.status = "cancelled"
        appointment.save()
        messages.success(request, "Appointment cancelled.")
        return redirect(f"{reverse('my-appointments')}?email={appointment.customer_email}")
    return render(request, "cancel_confirm.html", {"appointment": appointment})
