import { ISession } from 'app/shared/model/conference/session.model';

export interface ISpeaker {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  twitter?: string;
  bioContentType?: string;
  bio?: any;
  sessions?: ISession[];
}

export class Speaker implements ISpeaker {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public twitter?: string,
    public bioContentType?: string,
    public bio?: any,
    public sessions?: ISession[]
  ) {}
}
