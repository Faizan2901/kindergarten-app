import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import { tokenInterceptor } from './shared/token.interceptor';
// import { RoleInterceptor as rol } from './shared/role.interceptors';
import { CookieService } from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
  providers: 
  [
    // provideHttpClient(withInterceptors([tokenInterceptor])), 
    // provideHttpClient(withInterceptors([rol])),
    provideHttpClient(),
    CookieService,
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes)
  ]
};
