import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheService } from './league-cache.service';
import { IStanding } from './league-standing.model';
import { IFixture } from './league-fixture.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
    constructor(private cache: CacheService) { }

    intercept(
        request: HttpRequest<string>,
        next: HttpHandler
    ): Observable<HttpEvent<IStanding | IFixture >> {
        if (request.method !== 'GET') {
            return next.handle(request);
        }

        const cachedData = this.cache.get(request.url);

        if (cachedData) {
            // Check if the cached data has not expired
            const cacheTimestamp = this.cache.getTimestamp(request.url);
            const currentTime = Date.now();
            
            const ttl = environment.CACHE_TTL;
            console.log(cachedData);
            if (currentTime - cacheTimestamp <= ttl) {
                return of(new HttpResponse({ body: cachedData }));
            }
        }

        return next.handle(request).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.cache.set(request.url, event.body);
                     // Store the timestamp
                    this.cache.setTimestamp(request.url, Date.now());
                }
            })
        );
    }
}
