import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-albums-list',
  template: `
    <p>
      albums-list works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlbumsListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
