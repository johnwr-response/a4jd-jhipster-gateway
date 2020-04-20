import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { SpeakerUpdateComponent } from 'app/entities/conference/speaker/speaker-update.component';
import { SpeakerService } from 'app/entities/conference/speaker/speaker.service';
import { Speaker } from 'app/shared/model/conference/speaker.model';

describe('Component Tests', () => {
  describe('Speaker Management Update Component', () => {
    let comp: SpeakerUpdateComponent;
    let fixture: ComponentFixture<SpeakerUpdateComponent>;
    let service: SpeakerService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SpeakerUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SpeakerUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SpeakerUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SpeakerService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Speaker(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Speaker();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
