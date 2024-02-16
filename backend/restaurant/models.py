from django.db import models

from common.models import IndexedTimeStampedModel
from recipe.models import Recipe


# Create your models here.
class Restaurant(IndexedTimeStampedModel):
    name = models.CharField(max_length=20)
    address = models.CharField(max_length=40)
    city = models.CharField(max_length=10)
    recipes = models.ManyToManyField(Recipe, related_name="restaurants", through="Dish")

    def __str__(self):
        return "{} @ {}".format(self.name, self.city)

    def __repr__(self):
        return "{} @ {}".format(self.name, self.city)


class Dish(IndexedTimeStampedModel):
    name = models.CharField(max_length=10)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name="dishes")
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="dishes")
    price = models.FloatField(default=0)

    def __str__(self):
        return "{} [{}] @ {}".format(self.name, self.recipe, self.restaurant)

    def __repr__(self):
        return "{} [{}] @ {}".format(self.name, self.recipe, self.restaurant)
