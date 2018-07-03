import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})

export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  recipeId: number;

  constructor(private recipesService: RecipesService,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = +params['id'];
        this.recipe = this.recipesService.getRecipe(this.recipeId);
      }
    );
    this.recipesService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipe = this.recipesService.getRecipe(this.recipeId);
      }
    )
  }

  addToShoppingList() {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.recipeId);
  }
}
