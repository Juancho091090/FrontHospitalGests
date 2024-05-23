import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { routes } from '../app.routes';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-menu-inicio',
  standalone: true,
  imports: [AppComponent],
  templateUrl: './menu-inicio.component.html',
  styleUrl: './menu-inicio.component.css'
})
export class MenuInicioComponent {

  constructor(private router: Router) { }

  mr(){
    this.router.navigate(['medical_records'])
  }
  /*diagnosis(){
    this.router.navigate(['diagnosis'])
  }*/
  treat(){
    this.router.navigate(['treatments'])
  }
  l(){
    this.router.navigate(['login'])
  }
  medicine(){
    this.router.navigate(['medicines'])
  }
  mn(){
    this.router.navigate(['medical_notes'])
  }
  mrs(){
    this.router.navigate(['medical_results'])
  }

}
