import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ACST - ESS';

  constructor(private swUpdate: SwUpdate) {
    this.swUpdate.available.subscribe(() => {
      if (confirm("Versi terbaru tersedia, muat ulang konten?")) {
        window.location.reload(true);
      }
    });
   }
}
