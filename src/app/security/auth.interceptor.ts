import { HttpInterceptor, HttpRequest, HttpResponse, HttpEvent, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginService } from "./login/login.service";
import { Injector, Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    constructor(private injector: Injector) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const loginService = this.injector.get(LoginService)

        if(loginService.user!==undefined) {
            console.log('está logado')
            console.log(loginService.user)
            const authRequest = req.clone(
                {setHeaders: {'Authorization':`Bearer ${loginService.user.accessToken}`}}
                )
            return next.handle(authRequest)
        } else {
            console.log('não está logado')
            return next.handle(req)
        } 
    }



}