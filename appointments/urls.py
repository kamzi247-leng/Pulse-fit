from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("book/", views.book_appointment, name="book-appointment"),
    path("confirmed/<int:pk>/", views.appointment_confirmed, name="appointment-confirmed"),
    path("my-appointments/", views.my_appointments, name="my-appointments"),
    path("cancel/<int:pk>/", views.cancel_appointment, name="cancel-appointment"),
]
