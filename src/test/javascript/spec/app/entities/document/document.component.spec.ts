/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DocumentCarMysqlTestModule } from '../../../test.module';
import { DocumentComponent } from 'app/entities/document/document.component';
import { DocumentService } from 'app/entities/document/document.service';
import { Document } from 'app/shared/model/document.model';

describe('Component Tests', () => {
    describe('Document Management Component', () => {
        let comp: DocumentComponent;
        let fixture: ComponentFixture<DocumentComponent>;
        let service: DocumentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DocumentCarMysqlTestModule],
                declarations: [DocumentComponent],
                providers: []
            })
                .overrideTemplate(DocumentComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DocumentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Document(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.documents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
