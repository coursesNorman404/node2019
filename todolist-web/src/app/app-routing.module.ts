import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component'
import { LoginComponent } from './login/login.component';
import { ItemComponent } from './item/item.component';
import { ChatComponent } from './chat/chat.component';


const routes: Routes = [
  { path: "", component: LoginComponent},
  { path: "list", component: ListComponent },
  { path: "list/:id", component: ItemComponent},
  { path: "chat", component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
