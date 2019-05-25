import { Injectable } from "@angular/core";
import { WebsocketService } from './websocket.service'
import { Subject, Observable } from "rxjs";

@Injectable()

export class ChatService {
    messages: Subject<any>
    constructor( private wsService: WebsocketService){
        this.messages = <Subject<any>>wsService.connect().map(
            (response: any): any => {
                return response
            }
        )
    }
    sendMsg(msg){
        this.messages.next(msg)
    }
}
