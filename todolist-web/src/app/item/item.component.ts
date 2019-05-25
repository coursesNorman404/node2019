import { Component } from '@angular/core'

@Component({
    selector: 'app-item',
    template: 'Hola'
})

export class ItemComponent {
    constructor(){
        console.log('Hola')
    }
}