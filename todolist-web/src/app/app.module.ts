import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { CookieModule } from 'ngx-cookie'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component'
import { LoginComponent } from './login/login.component';
import { TodoListService } from './servicios/todolist.service';
import { ItemComponent } from './item/item.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './servicios/chat.service';
import { WebsocketService } from './servicios/websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    LoginComponent,
    ItemComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CookieModule.forRoot()
  ],
  providers: [TodoListService, ChatService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
