import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISpeaker } from 'app/shared/model/conference/speaker.model';
import { SpeakerService } from './speaker.service';

@Component({
  templateUrl: './speaker-delete-dialog.component.html'
})
export class SpeakerDeleteDialogComponent {
  speaker?: ISpeaker;

  constructor(protected speakerService: SpeakerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.speakerService.delete(id).subscribe(() => {
      this.eventManager.broadcast('speakerListModification');
      this.activeModal.close();
    });
  }
}
