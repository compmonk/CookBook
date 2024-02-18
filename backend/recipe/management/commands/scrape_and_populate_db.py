from django.core.management.base import BaseCommand
from recipe.models import Ingredient, Recipe

import requests
from bs4 import BeautifulSoup


class Command(BaseCommand):
    help = "Scrapes recipes from www.allrecipes.com and loads them into database"

    def add_arguments(self, parser):
        parser.add_argument("-c", "--count",
                            default=1000,
                            type=int,
                            help="Number of Recipes to scrape (max and default is 1000)",
                            required=False)

    def handle(self, *args, **options):
        base_url = "https://www.allrecipes.com/"
        session = requests.Session()

        stack = [{"id": 0, "name": "All Recipes", "url": base_url}]
        recipes = {}
        visited = []
        visited_ids = []

        def scrape_recipe_list():
            while len(recipes) <= min(options["count"], 1000):
                top = stack.pop()
                visited_ids.append(top["id"])
                visited.append(top)
                print("Parsing", top["url"])
                response = session.get(top["url"])
                soup = BeautifulSoup(response.text, "html.parser")
                for a in soup.find_all("a"):
                    link = a.get("href")
                    if link.startswith(
                        "https://www.allrecipes.com/recipes/") and link != "https://www.allrecipes.com/recipes/":
                        id = int(link.split("/")[4])
                        if id not in visited_ids:
                            stack.append({"id": id, "name": a.text.strip(), "url": link})
                    elif link.startswith("https://www.allrecipes.com/recipe/"):
                        id = int(link.split("/")[4])
                        recipes[id] = {"name": a.text.strip(), "url": link}
                self.stdout.write(self.style.SUCCESS(
                    "Visited:{}\tRecipe Lists: {}\tRecipes: {}".format(len(visited), len(stack), len(recipes))))

        def scrape_and_store_recipe(recipe_url):
            soup = BeautifulSoup(session.get(recipe_url).text, "html.parser")
            recipe_data = {
                "details": {},
                "title": soup.find("h1", {"class": "article-heading type--lion"}).text[:100],
                "description": soup.find("p", {"class": "article-subheading"}).text[:200],
                "directions": soup.find("div", {"class": "recipe__steps-content"}).text.strip()[:400]
            }

            detail_list = soup.find("div", {"class": "mntl-recipe-details__content"})
            for item in detail_list.find_all("div", {"class": "mntl-recipe-details__item"}):
                label = item.find("div", {"class": "mntl-recipe-details__label"}).text.strip().replace(":", "")
                value = item.find("div", {"class": "mntl-recipe-details__value"}).text.strip()
                recipe_data["details"][label] = value

            try:
                recipe_model = Recipe(**recipe_data)
                self.stdout.write(self.style.SUCCESS(recipe_model))
                recipe_model.save()

                ul = soup.find("ul", {"class": "mntl-structured-ingredients__list"})
                for li in ul.find_all("li"):
                    ingredient_model = Ingredient(name=li.text.strip()[:20], recipe=recipe_model)
                    ingredient_model.save()
                    # self.stdout.write(self.style.SUCCESS(ingredient_model))
            except Exception as e:
                self.stdout.write(self.style.ERROR(e))
                return False

            return True

        scrape_recipe_list()
        for i, (id, recipe) in enumerate(recipes.items()):
            self.stdout.write(self.style.SUCCESS(
                "Parsing {}/{}: {} {} ".format(i + 1, len(recipes),
                                               recipe["url"],
                                               "✅" if scrape_and_store_recipe(recipe["url"]) else "❌"
                                               )))
