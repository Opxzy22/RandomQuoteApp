from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserProfile

# Register your models here.
# quotes/admin.py

class UserProfileAdmin(UserAdmin):
    # Define the horizontal filter for related fields in admin view
    filter_horizontal = ('groups', 'user_permissions')

    # Specify filters for the list view in the admin panel
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups')

    # Display fields in the list view of the admin panel
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser', 'is_active')

    # Organize fields into different sections in the detail view of the admin panel
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login',)}),
    )

    # Define fields and layout for the add user view in the admin panel
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )

admin.site.register(UserProfile, UserProfileAdmin)

