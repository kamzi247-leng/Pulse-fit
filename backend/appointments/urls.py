from django.urls import path

from .views import (
    RegisterView,
    MeView,
    ServiceListView,
    AppointmentListCreateView,
    AppointmentDetailView
)


urlpatterns = [

    path(
        "auth/register/",
        RegisterView.as_view(),
        name="register"
    ),

    path(
        "auth/me/",
        MeView.as_view(),
        name="me"
    ),

    path(
        "services/",
        ServiceListView.as_view(),
        name="services"
    ),

    path(
        "appointments/",
        AppointmentListCreateView.as_view(),
        name="appointments"
    ),

    path(
        "appointments/<int:pk>/",
        AppointmentDetailView.as_view(),
        name="appointment-detail"
    ),
]