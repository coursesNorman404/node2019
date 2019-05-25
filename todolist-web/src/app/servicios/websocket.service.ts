import { Injectable } from "@angular/core";
import * as io from 'socket.io-client'
import * as Rx from 'rxjs/Rx'
import { Observable } from "rxjs";

@Injectable()

export class WebsocketService {
    private socket

    constructor() {}

    connect(): Rx.Subject<MessageEvent> {
        this.socket = io("http://localhost:5230")
        let observable = new Observable(observer => {
            this.socket.on("message", data => {
                observer.next(data)
            })
            return () => {
                this.socket.disconnect()
            }
        })
        let observer = {
            next: (data: Object) => {
                this.socket.emit("message", JSON.stringify(data))
            }
        }
        return Rx.Subject.create(observer, observable)
    }
}