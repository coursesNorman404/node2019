import { Component } from '@angular/core'
import { CookieService } from 'ngx-cookie'

import { TodoListService } from '../servicios/todolist.service'

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})

export class ListComponent {
    lists = null
    newList: any = {}
   constructor(private _cookie: CookieService, private todoList: TodoListService){
       this.todoList.setUserToken(this._cookie.get('id'))
       this.todoList.listUser().subscribe(res => {
           console.log(res)
           this.lists = res
       })
   }
   saveNewList () {
       console.log('Si entro')
       this.todoList.saveNewList(this.newList).subscribe(res => {
           this.lists.push(res)
           this.newList.name = ""
       }, err => {
           console.log(err)
       })
   }
}
