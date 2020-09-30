import {Component, Input, OnInit} from '@angular/core';
import {Photo} from '../../models/photo.model';

@Component({
    selector: 'app-photo',
    template: `
        <h2 class="photo-title">{{photo.title}}</h2>
        <img [src]="photo.thumbnailUrl" alt="">
    `,
    styles: [`
        :host {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
        }
        .photo-title {
            font-size: 30px;
        }
    `]
})
export class PhotoComponent implements OnInit {

    @Input() photo: Photo;

    constructor() {
    }

    ngOnInit(): void {
    }

}
