import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/Rx';

import { RecipesService } from '../recipes/recipes.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable()

export class DatabaseService {
  constructor(private http: HttpClient,
    private recipesService: RecipesService,
    private shoppingListService: ShoppingListService,
    private authService: AuthService) { }
  private dbUrl = 'https://ng-cookbook-b0cf8.firebaseio.com/data.json';

  save() {
    const data = {
      'recipes': this.recipesService.getRecipes(),
      'shopping-list': this.shoppingListService.getIngredients()
    };
    this.http.put(this.dbUrl, data)
    .subscribe(
      response => {
        console.log(response);
      }
    );
  }

  fetch() {
    this.http.get<Recipe[]>(this.dbUrl).map(
      (response) => {
        for (let recipe of response) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return response;
      }
    )
    .subscribe(
      response => {
        this.recipesService.saveRecipes(response['recipes']);
        this.shoppingListService.saveIngredients(response['shopping-list']);
      }
    );

  }
}
