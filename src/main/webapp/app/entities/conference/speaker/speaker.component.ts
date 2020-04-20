import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISpeaker } from 'app/shared/model/conference/speaker.model';
import { SpeakerService } from './speaker.service';
import { SpeakerDeleteDialogComponent } from './speaker-delete-dialog.component';

@Component({
  selector: 'jhi-speaker',
  templateUrl: './speaker.component.html'
})
export class SpeakerComponent implements OnInit, OnDestroy {
  speakers?: ISpeaker[];
  eventSubscriber?: Subscription;

  constructor(
    protected speakerService: SpeakerService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.speakerService.query().subscribe((res: HttpResponse<ISpeaker[]>) => (this.speakers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSpeakers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISpeaker): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInSpeakers(): void {
    this.eventSubscriber = this.eventManager.subscribe('speakerListModification', () => this.loadAll());
  }

  delete(speaker: ISpeaker): void {
    const modalRef = this.modalService.open(SpeakerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.speaker = speaker;
  }
}
