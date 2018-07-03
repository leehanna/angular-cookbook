import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

@Injectable()

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit {
  editMode = false;
  id: number;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipesService: RecipesService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        this.id = +params['id'];
      }
    )
    this.initForm();
  }

  initForm() {
    let recipeName = '';
    let imageUrl = '';
    let desc = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipesService.getRecipe(this.id);
      recipeName = recipe.name;
      imageUrl = recipe.imageUrl;
      desc = recipe.description;

      for (let ingredient of recipe.ingredients) {
        recipeIngredients.push(new FormGroup({
          'name': new FormControl(ingredient.name, Validators.required),
          'amount': new FormControl(ingredient.amount, [
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
          ])
        }));
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'description': new FormControl(desc, Validators.required),
      'imageUrl': new FormControl(imageUrl, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  getIngControls() {
    return <FormArray>this.recipeForm.get('ingredients');
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSave() {
    if (this.editMode) {
      this.recipesService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipesService.addRecipe(this.recipeForm.value);
    }
    this.recipeForm.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
