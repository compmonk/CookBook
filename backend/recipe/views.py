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

    # def post(self, request):
    #     try:
    #         ingredient = Ingredient.objects.create(**request.data)
    #         return Response(data=ingredient, status=status.HTTP_201_CREATED)
    #     except ValidationError as errors:
    #         return Response(data=errors.message_dict, status=status.HTTP_400_BAD_REQUEST)


class RecipeViewSet(ModelViewSet):
    lookup_field = "id"
    queryset = Recipe.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RecipeSerializer

    # def post(self, request):
    #     try:
    #         recipe = Recipe.objects.create(**request.data)
    #         return Response(data=recipe, status=status)
    #     except ValidationError as error:
    #         return Response(data=error.message_dict, status=status.HTTP_400_BAD_REQUEST)
