import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';
import { ResultsGuard } from './results/results.guard';
import { DialogCountriesComponent } from './dialog-countries/dialog-countries.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    HomeComponent,
    ResultsComponent,
    DialogCountriesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    ScrollingModule,
    MatPaginatorModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatDialogModule,
    RouterModule.forRoot([
      { path: 'yalla-home/:country', component: HomeComponent },
      { path: 'yalla-search/:searchValue/:phrase',
        canActivate:[ResultsGuard],
        component: ResultsComponent },
      { path: '', redirectTo: 'yalla-home/eg', pathMatch: 'full' },
      { path: '**', redirectTo: 'yalla-home/eg', pathMatch: 'full' } // Usually redirected to 404 page
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
