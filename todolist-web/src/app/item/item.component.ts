import { Component } from '@angular/core'
import { CookieService } from 'ngx-cookie'
import { ActivatedRoute } from '@angular/router'

import { TodoListService } from '../servicios/todolist.service'

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})

export class ItemComponent {
    id = null
    list: any = {name: 'Lista'}
    item = null
    newItem: any = {}
    elementDelete: any = {}

    constructor(
        private todolist: TodoListService,
        private router: ActivatedRoute,
        private _cookieService: CookieService
    ){
        this.todolist.setUserToken(this._cookieService.get('id'))
        this.id = this.router.snapshot.params["id"]
        this.todolist.infoList(this.id).subscribe(res => {
            this.list = res
        })
        this.todolist.items(this.id).subscribe(res => {
            this.item = res
            console.log(res)
        })
    }
    new() {
        this.todolist.newItem(this.id, this.newItem.name).subscribe(res => {
            this.item.push(res)
            this.newItem.name = ''
        })
    }
    update(i){
        this.todolist.updateItem(this.id, this.item[i]).subscribe(res => {
            this.item[i] = res
        })
    }
}