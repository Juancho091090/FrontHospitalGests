import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule} from '@angular/common/http';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  
    importProvidersFrom(
      HttpClientModule, ReactiveFormsModule, NgbModalModule, NgModel
    )
  ]
};
