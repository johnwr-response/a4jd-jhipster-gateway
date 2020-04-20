import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISpeaker, Speaker } from 'app/shared/model/conference/speaker.model';
import { SpeakerService } from './speaker.service';
import { SpeakerComponent } from './speaker.component';
import { SpeakerDetailComponent } from './speaker-detail.component';
import { SpeakerUpdateComponent } from './speaker-update.component';

@Injectable({ providedIn: 'root' })
export class SpeakerResolve implements Resolve<ISpeaker> {
  constructor(private service: SpeakerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISpeaker> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((speaker: HttpResponse<Speaker>) => {
          if (speaker.body) {
            return of(speaker.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Speaker());
  }
}

export const speakerRoute: Routes = [
  {
    path: '',
    component: SpeakerComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Speakers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SpeakerDetailComponent,
    resolve: {
      speaker: SpeakerResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Speakers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SpeakerUpdateComponent,
    resolve: {
      speaker: SpeakerResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Speakers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SpeakerUpdateComponent,
    resolve: {
      speaker: SpeakerResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Speakers'
    },
    canActivate: [UserRouteAccessService]
  }
];
