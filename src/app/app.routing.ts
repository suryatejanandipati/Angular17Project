import { Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';
import { TeachersComponent } from './student/teachers/teachers.component';
import { adminGuard } from './admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'teacher', component: TeachersComponent },
  { path: 'customer', component: CustomerComponent, canActivate: [adminGuard] },
  { path: 'student', component: StudentComponent },
  {
    path: 'aboutus',
    loadChildren: () =>
      import('./about-us/about-us.routing').then((c) => c.ANGULAR_ROUTES),
  },
];
