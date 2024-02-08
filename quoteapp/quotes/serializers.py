from rest_framework import serializers
from django.contrib.auth import get_user_model
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import PasswordChangeSerializer



class UserSerializer(serializers.ModelSerializer):
    class meta:
        model = get_user_model
        fields = ('id', 'email', 'username')

from rest_framework import serializers
from django.contrib.auth import get_user_model

class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    """

    class Meta:
        model = get_user_model()  # Use the custom user model
        fields = ('id', 'email', 'username', 'password')  # Fields to include in the serialization
        extra_kwargs = {'password': {'write_only': True}}
        # The 'extra_kwargs' attribute is used to provide additional options for the serializer fields.
        # Here, it specifies that the 'password' field should be write-only, meaning it won't be included
        # when serializing the data (e.g., in API responses).

    def create(self, validated_data):
        """
        Custom method to handle user creation during registration.
        """
        user = get_user_model().objects.create_user(**validated_data)
        # 'create_user' is a method define in the custom user model manager.
        # It should handle the actual creation of a new user with proper password hashing.
        return user

class ChangeUserPasswordChangeSerializer(PasswordChangeSerializer):
        
        pass