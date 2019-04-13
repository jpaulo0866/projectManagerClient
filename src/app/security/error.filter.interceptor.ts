import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Injectable()
export class HttpErrorFilter implements HttpInterceptor {

    constructor(private shared: SharedService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: any) => {
                console.log(error)
                if (error.status === 401) {
                    this.shared.forceLogout();
                }
                return throwError(error);
            })
        );
    }
}