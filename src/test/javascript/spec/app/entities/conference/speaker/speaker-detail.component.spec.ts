import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { SpeakerDetailComponent } from 'app/entities/conference/speaker/speaker-detail.component';
import { Speaker } from 'app/shared/model/conference/speaker.model';

describe('Component Tests', () => {
  describe('Speaker Management Detail Component', () => {
    let comp: SpeakerDetailComponent;
    let fixture: ComponentFixture<SpeakerDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ speaker: new Speaker(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [SpeakerDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SpeakerDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SpeakerDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load speaker on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.speaker).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
