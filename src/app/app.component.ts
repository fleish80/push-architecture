import {Component, OnInit} from '@angular/core';
import {UserIdService} from './sevices/user-id.service';

@Component({
    selector: 'app-root',
    template: `
        <app-user-table></app-user-table>
        <app-photo></app-photo>
    `,
    styles: [],
    providers: [UserIdService]
})
export class AppComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }
}
