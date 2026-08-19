from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Service, Appointment


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password"
        ]

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )

        return user


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email"
        ]


class ServiceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Service
        fields = [
            "id",
            "name",
            "description",
            "duration_minutes",
            "price",
            "is_active"
        ]


class AppointmentSerializer(serializers.ModelSerializer):

    service_name = serializers.CharField(
        source="service.name",
        read_only=True
    )

    class Meta:
        model = Appointment

        fields = [
            "id",
            "service",
            "service_name",
            "customer_name",
            "customer_email",
            "customer_phone",
            "date",
            "start_time",
            "notes",
            "status",
            "created_at"
        ]

        read_only_fields = [
            "status",
            "created_at"
        ]

    def create(self, validated_data):

        request = self.context["request"]

        user = request.user

        appointment = Appointment.objects.create(
            user=user,
            **validated_data
        )

        return appointment