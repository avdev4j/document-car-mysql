/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DocumentCarMysqlTestModule } from '../../../test.module';
import { ContentUpdateComponent } from 'app/entities/content/content-update.component';
import { ContentService } from 'app/entities/content/content.service';
import { Content } from 'app/shared/model/content.model';

describe('Component Tests', () => {
    describe('Content Management Update Component', () => {
        let comp: ContentUpdateComponent;
        let fixture: ComponentFixture<ContentUpdateComponent>;
        let service: ContentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DocumentCarMysqlTestModule],
                declarations: [ContentUpdateComponent]
            })
                .overrideTemplate(ContentUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ContentUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ContentService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Content(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.content = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Content();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.content = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
