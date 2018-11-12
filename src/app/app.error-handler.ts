import { HttpErrorResponse } from '@angular/common/http'
import {Observable} from 'rxjs'
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { NotificationService } from './shared/messages/notification.service';
import { LoginService } from './security/login/login.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

    constructor(private nf: NotificationService, private injector: Injector, private nz: NgZone) {
        super()
    }

    handleError(errorResponse: Response | any) {
        if(errorResponse instanceof HttpErrorResponse) {
            const message = errorResponse.error.message
            this.nz.run(()=>{
                switch(errorResponse.status) {
                    case 401: 
                        this.injector.get(LoginService).handleLogin()
                    break;
                    case 403:
                        this.nf.notify(message || 'Não autorizado') 
                    break;
                    case 404:
                    this.nf.notify(message || 'recurso não encontrado')  
                    break;
                }
            })
        }
        super.handleError(errorResponse)
    }
}