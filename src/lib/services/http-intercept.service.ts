import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addCorsProxy, httplizeIpfsUri, replacePinataGateway } from 'src/lib/utility';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let url = httplizeIpfsUri(req.url);
    url = replacePinataGateway(url);
    url = addCorsProxy(url);
    req = req.clone({ url });
    return next.handle(req);
  }
}
