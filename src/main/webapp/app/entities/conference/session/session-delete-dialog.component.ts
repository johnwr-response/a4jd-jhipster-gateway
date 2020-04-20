import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISession } from 'app/shared/model/conference/session.model';
import { SessionService } from './session.service';

@Component({
  templateUrl: './session-delete-dialog.component.html'
})
export class SessionDeleteDialogComponent {
  session?: ISession;

  constructor(protected sessionService: SessionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sessionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('sessionListModification');
      this.activeModal.close();
    });
  }
}
