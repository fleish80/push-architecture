import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <app-user-table></app-user-table>
        <app-photo></app-photo>
    `,
})
export class AppComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }
}
