import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { httplizeIpfsUri } from 'Lib/utility';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const url = httplizeIpfsUri(req.url);
    req = req.clone({ url });
    return next.handle(req);
  }
}
