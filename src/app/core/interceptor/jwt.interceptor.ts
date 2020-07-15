import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";
import { environment } from "../../../environments/environment";
import { environment as environmentLocal} from "../../../environments/environment.local";
import { environment as environmentDev} from "../../../environments/environment.dev";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const currentUser = this.authenticationService.currentUserValue
        const isLogged = currentUser && currentUser.token
        const isApiUrl = request.url.startsWith(environment.API_URL) 
                        || request.url.startsWith(environmentLocal.API_URL) 
                        || request.url.startsWith(environmentDev.API_URL)

        if (isLogged && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            })
        }

        return next.handle(request)
    }
}