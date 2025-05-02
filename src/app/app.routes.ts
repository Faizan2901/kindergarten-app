import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { DashoboardComponent } from './features/dashboard/dashoboard/dashoboard.component';
import { AboutComponent } from './features/about/about.component';
import { ActivitiesComponent } from './features/activities/activities.component';
import { ContactComponent } from './features/contact/contact.component';
import { MemoryGameComponent } from './features/memory-game/memory-game.component';
import { authGuard } from './guards/auth/auth.guard';
import { ManagestudentComponent } from './students/managestudent/managestudent.component';
import { roleGuard } from './guards/role/role.guard';
import { ManageteacherComponent } from './teachers/manageteacher/manageteacher.component';
import { AttendancesummaryComponent } from './teachers/attendancesummary/attendancesummary.component';
import { AttendanceComponent } from './teachers/attendance/attendance.component';
import { AnnouncementsComponent } from './features/announcement/announcements/announcements.component';
import { GalleryComponent } from './features/gallery/gallery.component';
import { PagenotfoundComponent } from './features/pagenotfound/pagenotfound/pagenotfound.component';
import { AttendanceeditComponent } from './teachers/attendance/attendanceedit/attendanceedit.component';
import { EditstudentComponent } from './students/editstudent/editstudent/editstudent.component';
import { MyattendanceComponent } from './students/myattendance/myattendance.component';

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
    },
    {
        path: 'announcements',
        component: AnnouncementsComponent
    },
    {
        path: 'manage-students',
        component: ManagestudentComponent,
        canActivate: [roleGuard(['ADMIN','TEACHER'])]
    },
    {
        path: 'manage-teachers',
        component: ManageteacherComponent,
        canActivate: [roleGuard(['ADMIN'])]
    },
    {
        path: 'attendance-summary',
        component: AttendancesummaryComponent,
        canActivate: [roleGuard(['ADMIN','TEACHER'])]
    },
    {
        path: 'attendance',
        component: AttendanceComponent,
        canActivate: [roleGuard(['ADMIN','TEACHER'])]
    },
    {
        path: 'gallery',
        component: GalleryComponent
    },
    {
        path: 'attendance/edit', 
        component: AttendanceeditComponent, 
        canActivate: [roleGuard(['ADMIN','TEACHER'])] 
    },
    {
        path: 'edit-student',
        component: EditstudentComponent,
        canActivate: [roleGuard(['ADMIN','TEACHER'])] 
    },
    {
        path: 'my-attendance',
        component: MyattendanceComponent,
        canActivate: [roleGuard(['ADMIN','TEACHER','STUDENT'])]
    },
    {
        path: '**', 
        component: PagenotfoundComponent
    },

];
