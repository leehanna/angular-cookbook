import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()

export class RecipesService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      'Kimchi Fried Rice',
      'Fried rice flavored with delicious kimchi',
      'https://www.koreanbapsang.com/wp-content/uploads/2010/12/DSC_1097-2.jpg',
      [
        new Ingredient('Kimchi', 10),
        new Ingredient('Spam Ham', 1),
        new Ingredient('Rice', 1),
        new Ingredient('Onion', 1)
      ]
    ),
    new Recipe(
      'Oven Baked Salmon',
      'Simple and delicious oven-baked recipe',
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/7/26/1/CN1B01_oven-baked-salmon_s4x3.jpg.rend.hgtvcom.616.462.suffix/1382545141944.jpeg',
      [
        new Ingredient('Salmon', 1),
        new Ingredient('Lemon', 1),
        new Ingredient('Salt', 1),
        new Ingredient('Pepper', 1),
        new Ingredient('Garlic Powder', 1)
      ]
    )
  ]

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  saveRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
