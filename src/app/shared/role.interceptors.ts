// import { HttpInterceptorFn } from '@angular/common/http';

// export const RoleInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req).pipe(
//     (event: any) => {
//       event.subscribe((response: any) => {
//         const roles = response.headers?.get('X-Roles');

//         if (roles) {
//           localStorage.setItem("roles", roles);
//         }
//       });
//       return event;
//     }
//   );
// };
