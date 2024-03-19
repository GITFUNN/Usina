from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
   path('login/', views.MyTokenObtainPairSerializer.as_view()),
    path('refresh/', TokenRefreshView.as_view()),
    path('register/', views.register),
    path('post/', views.create_drink),
    path('get/<int:pk>/', views.get_drink),
    path('get/', views.get_drinks),
    path('edit/<int:pk>/', views.edit_drink),
    path('delete/<int:pk>/', views.delete_drink),
    path('postC/', views.create_category),
    path('getC/<int:pk>/', views.get_category),
    path('getC/', views.get_categories),
    path('editC/<int:pk>/', views.edit_category),
    path('deleteC/<int:pk>/', views.delete_category),
]
