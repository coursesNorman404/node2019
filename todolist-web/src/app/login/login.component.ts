import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie'
import { TodoListService } from '../servicios/todolist.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginUser: any = {}
    user: any = {}
    constructor(
        private todolist: TodoListService,
        private router: Router,
        private _cookie: CookieService
        ){
        if (this._cookie.get('id')) {
            this.router.navigateByUrl('list')
        }
    }
    login(){
        this.todolist.login(this.loginUser.email, this.loginUser.password).subscribe(res => {
            this.user = res
            this.router.navigateByUrl('list')
            this._cookie.put('id', this.user._id)
        }, err => {
            alert(err.error.message)
            console.log(err)
        })
    }
}