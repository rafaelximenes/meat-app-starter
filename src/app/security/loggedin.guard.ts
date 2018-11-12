import { CanLoad, Route, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

    constructor(private loginService: LoginService) {}

    checkAuthentication(path: string): boolean {
        if(!this.loginService.isLoggedIn()) {
            this.loginService.handleLogin(`/${path}`);
        } 
        return true
    }

    canLoad(route: Route) : boolean {
        return this.checkAuthentication(route.path)
    }

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        return this.checkAuthentication(activatedRoute.routeConfig.path)
    }

}