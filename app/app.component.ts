import { Component }            from '@angular/core';
import { Auth }                 from './services/auth/auth.service';

@Component({
    selector: 'my-app',
    providers: [ Auth ],
    templateUrl: 'app/app.template.html'
})

export class AppComponent {

  constructor(private auth: Auth) {
    auth.getAccessToken();
  }

};
