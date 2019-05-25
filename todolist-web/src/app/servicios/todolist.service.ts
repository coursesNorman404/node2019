import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
@Injectable()

export class TodoListService {
    API_ENDPOINT = 'http://localhost:5230/api/'
    user: String = ''
    constructor(private http: HttpClient) {}

    public login(email, password) {
        return this.http.post(this.API_ENDPOINT + 'login', { email, password })
    }
    public listUser() {
        return this.http.get(`${this.API_ENDPOINT}user/${this.user}/list`)
    }
    public setUserToken(token: String) {
        this.user = token
    }
    public saveNewList(list) {
        return this.http.post(`${this.API_ENDPOINT}user/${this.user}/list`, {
            name: list.name,
            category: 'Hola'
        })
    }
}
