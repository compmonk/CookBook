from .views import RestViewSet
from recipe.views import RecipeViewSet, IngredientViewSet

routes = [
    {"regex": r"rest", "viewset": RestViewSet, "basename": "Rest"},
    {"regex": r"recipe", "viewset": RecipeViewSet, "basename": "Recipe"},
    {"regex": r"ingredient", "viewset": IngredientViewSet, "basename": "Ingredient"},
]
