from django.db import transaction
from rest_framework.serializers import ModelSerializer
from .models import Recipe, Ingredient


class IngredientSerializer(ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "__all__"


class RecipeSerializer(ModelSerializer):
    ingredients = IngredientSerializer(many=True)

    class Meta:
        model = Recipe
        fields = "__all__"
        depth = 1

    def create(self, data):
        with transaction.atomic():
            ingredients = data.pop("ingredients", None)
            recipe = Recipe.objects.create(**data)
            recipe.save()
            for ingredient in ingredients:
                ingredient["recipe"] = recipe
                ingredient_object = Ingredient.objects.create(**ingredient)
                ingredient_object.save()
            return recipe
