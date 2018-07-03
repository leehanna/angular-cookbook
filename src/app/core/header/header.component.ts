import { Component, OnInit, Injectable } from '@angular/core';

import { DatabaseService } from '../../shared/database.service';
import { RecipesService } from '../../recipes/recipes.service';
import { AuthService } from '../../auth/auth.service';

@Injectable()

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor(private db: DatabaseService,
    private recipesService: RecipesService,
    private authService: AuthService) { }

  ngOnInit() {
  }

  onSave() {
    this.db.save();
  }

  onFetch() {
    this.db.fetch();
  }

  onLogout() {
    this.authService.logout();
  }
}
