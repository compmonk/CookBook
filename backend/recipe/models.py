from django.db import models

from common.models import IndexedTimeStampedModel


# Create your models here.
class Recipe(IndexedTimeStampedModel):
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=200)
    directions = models.TextField(max_length=400)
    details = models.JSONField(default=dict, blank=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.title

    def __repr__(self):
        return self.title


class Ingredient(IndexedTimeStampedModel):
    name = models.CharField(max_length=20)
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name="ingredients")

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name
