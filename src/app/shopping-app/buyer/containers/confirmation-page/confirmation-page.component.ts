import { Component } from '@angular/core';

@Component({
    selector: 'confirm-page',
    styleUrls: ['confirmation-page.component.css'],
    template: `
    <div>
        <h4>You successfully ordered products <span>*insert list of products bought*</span></h4>
        <a routerLink="/shop">Continue Shopping!!!!!!</a>
    </div>
    `
})

export class ConfirmationPageComponent{}