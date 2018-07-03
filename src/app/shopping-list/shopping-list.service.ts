import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 3),
    new Ingredient('Tomatoes', 5),
    new Ingredient('Avocadoes', 2),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  saveIngredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  selectIngredient(index: number) {
    this.startedEditing.next(index);
  }

  editIngredient(index: number, name: string, amount: number) {
    this.ingredients[index].name = name;
    this.ingredients[index].amount = amount;
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
