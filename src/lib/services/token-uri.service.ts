import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TMetadata } from 'Lib/contracts/type-define';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TokenURIService {
  private metaData$: { [tokenUri: string]: Observable<TMetadata> } = {};

  constructor(private http: HttpClient) {}

  getMetaData$(tokenUri: string): Observable<TMetadata> {
    if (!this.metaData$[tokenUri]) {
      this.metaData$[tokenUri] = this.http.get<TMetadata>(tokenUri).pipe(shareReplay(1));
    }
    return this.metaData$[tokenUri];
  }
}
