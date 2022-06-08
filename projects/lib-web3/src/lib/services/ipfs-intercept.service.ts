import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IpfsService } from 'projects/lib-web3/src/lib/services/ipfs.service.ts.service';

@Injectable({
  providedIn: 'root',
})
export class IPFSInterceptorService implements HttpInterceptor {
  constructor(private ipfsService: IpfsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let url = this.ipfsService.httplizeIpfsUri(req.url);
    url = this.ipfsService.replacePinataGateway(url);
    url = this.ipfsService.addCorsProxy(url);
    req = req.clone({ url });
    return next.handle(req);
  }
}
