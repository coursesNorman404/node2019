import { Component, OnInit } from '@angular/core';
import { ChatService } from '../servicios/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chat: any = [
    {text: 'Hi'},
    {text: 'Norman'}
  ]
  message: any = {}
  constructor( private wschat: ChatService) { }

  ngOnInit() {
    this.wschat.messages.subscribe(msg => {
      this.chat.push(msg)
    })
  }
  sendMessage() {
    this.wschat.sendMsg(this.message.text)
    this.message.text = ""
  }

}
