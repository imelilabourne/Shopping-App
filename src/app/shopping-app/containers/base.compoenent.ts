import { Component } from '@angular/core';

@Component({
    selector: 'base-component',
    template: `
    <div>
       <router-outlet></router-outlet>
    </div>
    `
})
export class BaseComponent{}