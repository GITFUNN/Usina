from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.utils import timezone
# Create your models here.
class CustomUserManager(UserManager):

    def _create_user(self, email, password, **extra_fields):
        if not email :
            raise ValueError("Please provide an email address")
        email =  self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_user(self, email = None, password = None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault("is_superuser", False)

        return self._create_user(email, password, **extra_fields)
    
    def create_superuser(self, email = None, password = None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault("is_superuser", True)
        return self._create_user(email, password, **extra_fields)
    

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique = True)
    date_joined = models.DateTimeField(default = timezone.now)
    is_staff = models.BooleanField(default = True)
    objects = CustomUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
        
    class Meta:
        ordering = ['-date_joined']

    def __str__(self):
        return f'{self.email}'
    

class Drinks (models.Model):
    name = models.CharField(max_length = 255)
    price = models.DecimalField(max_digits =10, decimal_places = 2)
   
