/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DocumentCarMysqlTestModule } from '../../../test.module';
import { ContentDeleteDialogComponent } from 'app/entities/content/content-delete-dialog.component';
import { ContentService } from 'app/entities/content/content.service';

describe('Component Tests', () => {
    describe('Content Management Delete Component', () => {
        let comp: ContentDeleteDialogComponent;
        let fixture: ComponentFixture<ContentDeleteDialogComponent>;
        let service: ContentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DocumentCarMysqlTestModule],
                declarations: [ContentDeleteDialogComponent]
            })
                .overrideTemplate(ContentDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ContentDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContentService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
