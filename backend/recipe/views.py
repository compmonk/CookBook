from django.core.exceptions import ValidationError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from .serializers import IngredientSerializer, RecipeSerializer

from .models import Ingredient, Recipe


class IngredientViewSet(ModelViewSet):
    lookup_field = "id"
    queryset = Ingredient.objects.all()
    permission_classes = [AllowAny]
    serializer_class = IngredientSerializer


class RecipeViewSet(ModelViewSet):
    lookup_field = "id"
    queryset = Recipe.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RecipeSerializer

    def create(self, request, *args, **kwargs):
        try:
            recipe_serializer = RecipeSerializer()
            recipe = recipe_serializer.create(request.data)
            return Response(data=RecipeSerializer(recipe).data, status=status.HTTP_201_CREATED)
        except ValidationError as error:
            return Response(data=error.message_dict, status=status.HTTP_400_BAD_REQUEST)
