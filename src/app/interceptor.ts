import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private router: Router, private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const newRequest = req.clone({
            headers: req.headers.set(
                'Authorization',
                `Bearer ${this.auth.getToken()} `
            )
        });

        console.log(newRequest);

        return next.handle(newRequest);
    }

    // handleError(error: HttpErrorResponse) {
    //     if (error.status === 401) {
    //         return this.router.navigate(['/login']);
    //     }
    // }
}