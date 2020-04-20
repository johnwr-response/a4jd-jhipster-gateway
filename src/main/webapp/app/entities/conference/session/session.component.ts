import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISession } from 'app/shared/model/conference/session.model';
import { SessionService } from './session.service';
import { SessionDeleteDialogComponent } from './session-delete-dialog.component';

@Component({
  selector: 'jhi-session',
  templateUrl: './session.component.html'
})
export class SessionComponent implements OnInit, OnDestroy {
  sessions?: ISession[];
  eventSubscriber?: Subscription;

  constructor(
    protected sessionService: SessionService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.sessionService.query().subscribe((res: HttpResponse<ISession[]>) => (this.sessions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSessions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISession): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInSessions(): void {
    this.eventSubscriber = this.eventManager.subscribe('sessionListModification', () => this.loadAll());
  }

  delete(session: ISession): void {
    const modalRef = this.modalService.open(SessionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.session = session;
  }
}
