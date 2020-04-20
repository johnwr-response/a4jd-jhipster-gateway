import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ISpeaker, Speaker } from 'app/shared/model/conference/speaker.model';
import { SpeakerService } from './speaker.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { ISession } from 'app/shared/model/conference/session.model';
import { SessionService } from 'app/entities/conference/session/session.service';

@Component({
  selector: 'jhi-speaker-update',
  templateUrl: './speaker-update.component.html'
})
export class SpeakerUpdateComponent implements OnInit {
  isSaving = false;
  sessions: ISession[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    email: [null, [Validators.required]],
    twitter: [null, [Validators.required]],
    bio: [null, [Validators.required]],
    bioContentType: [],
    sessions: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected speakerService: SpeakerService,
    protected sessionService: SessionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ speaker }) => {
      this.updateForm(speaker);

      this.sessionService.query().subscribe((res: HttpResponse<ISession[]>) => (this.sessions = res.body || []));
    });
  }

  updateForm(speaker: ISpeaker): void {
    this.editForm.patchValue({
      id: speaker.id,
      firstName: speaker.firstName,
      lastName: speaker.lastName,
      email: speaker.email,
      twitter: speaker.twitter,
      bio: speaker.bio,
      bioContentType: speaker.bioContentType,
      sessions: speaker.sessions
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('gatewayApp.error', { message: err.message })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const speaker = this.createFromForm();
    if (speaker.id !== undefined) {
      this.subscribeToSaveResponse(this.speakerService.update(speaker));
    } else {
      this.subscribeToSaveResponse(this.speakerService.create(speaker));
    }
  }

  private createFromForm(): ISpeaker {
    return {
      ...new Speaker(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      email: this.editForm.get(['email'])!.value,
      twitter: this.editForm.get(['twitter'])!.value,
      bioContentType: this.editForm.get(['bioContentType'])!.value,
      bio: this.editForm.get(['bio'])!.value,
      sessions: this.editForm.get(['sessions'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISpeaker>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ISession): any {
    return item.id;
  }

  getSelected(selectedVals: ISession[], option: ISession): ISession {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
