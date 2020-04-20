import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { SpeakerComponent } from './speaker.component';
import { SpeakerDetailComponent } from './speaker-detail.component';
import { SpeakerUpdateComponent } from './speaker-update.component';
import { SpeakerDeleteDialogComponent } from './speaker-delete-dialog.component';
import { speakerRoute } from './speaker.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(speakerRoute)],
  declarations: [SpeakerComponent, SpeakerDetailComponent, SpeakerUpdateComponent, SpeakerDeleteDialogComponent],
  entryComponents: [SpeakerDeleteDialogComponent]
})
export class ConferenceSpeakerModule {}
