from django.contrib.auth.models import User

from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Service, Appointment
from .serializers import (
    RegisterSerializer,
    UserSerializer,
    ServiceSerializer,
    AppointmentSerializer
)


class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()

    serializer_class = RegisterSerializer

    permission_classes = [
        permissions.AllowAny
    ]


class MeView(APIView):

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get(self, request):

        serializer = UserSerializer(request.user)

        return Response(serializer.data)


class ServiceListView(generics.ListAPIView):

    queryset = Service.objects.filter(
        is_active=True
    )

    serializer_class = ServiceSerializer

    permission_classes = [
        permissions.AllowAny
    ]


class AppointmentListCreateView(
    generics.ListCreateAPIView
):

    serializer_class = AppointmentSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):

        return Appointment.objects.filter(
            user=self.request.user
        )

    def perform_create(self, serializer):

        serializer.save(
            user=self.request.user
        )


class AppointmentDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    serializer_class = AppointmentSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):

        return Appointment.objects.filter(
            user=self.request.user
        )