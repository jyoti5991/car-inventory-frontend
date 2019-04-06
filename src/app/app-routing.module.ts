import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "../app/components/home/home.component";
import { ModelComponent } from "../app/components/model/model.component";
import { ListingComponent } from "../app/components/listing/listing.component";

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  { 
    path: 'home', 
    component: HomeComponent
  },
  { 
    path: 'add-model', 
    component: ModelComponent
  },
  { 
    path: 'listing', 
    component: ListingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
