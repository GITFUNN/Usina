from .serializers import (
    RegisterUserSerializer,
    MyTokenObtainPairSerializer,
    DrinksSerializer,
)
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from .models import User, Drinks
from rest_framework import status
from rest_framework.decorators import api_view


# Create your views here.
@api_view(["POST"])
def register(request):
    data = request.data
    user = User.objects.create(
        email=data["email"], password=make_password(data["password"])
    )
    serializer = RegisterUserSerializer(user, many=False)
    if serializer.is_valid():
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairSerializer(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer





@api_view(["POST"])
def create_drink(request):
    serializer = DrinksSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(["GET"])
def get_drinks(request):
    drinks = Drinks.objects.all()
    serializer = DrinksSerializer(drinks, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_drink(request, pk):
    drink = Drinks.objects.get(pk=pk)
    serializer = DrinksSerializer(drink)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["PUT"])
def edit_drink(request, pk):
    drink = Drinks.objects.get(pk=pk)
    serializer = DrinksSerializer(drink, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(["DELETE"])
def delete_drink(request,pk):
    drink = Drinks.objects.get(pk=pk)
    drink.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    