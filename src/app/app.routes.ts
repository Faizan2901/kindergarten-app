import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashoboardComponent } from './features/dashboard/dashoboard/dashoboard.component';
import { AboutComponent } from './features/about/about.component';
import { ActivitiesComponent } from './features/activities/activities.component';
import { ContactComponent } from './features/contact/contact.component';
import { MemoryGameComponent } from './features/memory-game/memory-game.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'dashboard',
        component: DashoboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'activities',
        component: ActivitiesComponent
    },
    {
        path: 'memory-game',
        component: MemoryGameComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    }
];
