import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html'
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  ingredientForm: FormGroup;
  subscription: Subscription;
  editMode = false;
  editIngredientIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredientForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)])
    });

    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editIngredientIndex = index;
        const selectedIngredient = this.shoppingListService.getIngredient(index);
        this.ingredientForm.setValue({
          'name': selectedIngredient.name,
          'amount': selectedIngredient.amount
        });
      }
    )
  }

  onSubmit() {
    const form = this.ingredientForm.value;
    if (this.editMode) {
      this.shoppingListService.editIngredient(this.editIngredientIndex, form.name, form.amount);
    } else {
      const newIngredient: Ingredient = new Ingredient(form.name, form.amount);
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.ingredientForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editIngredientIndex);
    this.onClear();
  }

  onClear() {
    this.ingredientForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
