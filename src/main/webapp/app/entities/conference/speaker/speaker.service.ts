import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISpeaker } from 'app/shared/model/conference/speaker.model';

type EntityResponseType = HttpResponse<ISpeaker>;
type EntityArrayResponseType = HttpResponse<ISpeaker[]>;

@Injectable({ providedIn: 'root' })
export class SpeakerService {
  public resourceUrl = SERVER_API_URL + 'services/conference/api/speakers';

  constructor(protected http: HttpClient) {}

  create(speaker: ISpeaker): Observable<EntityResponseType> {
    return this.http.post<ISpeaker>(this.resourceUrl, speaker, { observe: 'response' });
  }

  update(speaker: ISpeaker): Observable<EntityResponseType> {
    return this.http.put<ISpeaker>(this.resourceUrl, speaker, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISpeaker>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISpeaker[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
