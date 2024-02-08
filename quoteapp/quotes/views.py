from django.shortcuts import render
from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, RegisterSerializer, ChangeUserPasswordChangeSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.decorators import action
from dj_rest_auth.views import LoginView, LogoutView, PasswordChangeView, PasswordResetView, PasswordChangeView
from rest_framework.permissions import AllowAny
from .models import UserProfile
import logging
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.contrib.auth.views import PasswordResetView
from django.urls import reverse_lazy
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated

logger = logging.getLogger(__name__)

# View for user registration
class RegisterView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    # Use the existing perform_create method provided by CreateAPIView
    def perform_create(self, serializer):
        instance = serializer.save()
        headers = self.get_success_headers(serializer.data)

        response_data = {
            "message": "user registered successfully.",
            "id": instance.id,
            "email": instance.email,
        }

        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)
    
class CustomLoginView(LoginView):
    def post(self, request, *args, **kwargs):
        # Customize the behavior before or after the login
        response = super().post(request, *args, **kwargs)
       
        return response
    
class CustomLogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Delete the user's authentication token
        Token.objects.filter(user=request.user).delete()

        # Log the user out
        logout(request)

        return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
    
class CustomPasswordChangeView(PasswordChangeView):
    serializer_class = ChangeUserPasswordChangeSerializer

class CustomPasswordChangeView(PasswordResetView):
    email_template_name = 'registration/password_reset_email.txt'
    subject_template_name = 'registration/password_reset_subject.txt'
    success_url = reverse_lazy('password_reset_done')

    def form_valid(self, form):
        response = super().form_valid(form)
       
        return response