/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DocumentCarMysqlTestModule } from '../../../test.module';
import { CarComponent } from 'app/entities/car/car.component';
import { CarService } from 'app/entities/car/car.service';
import { Car } from 'app/shared/model/car.model';

describe('Component Tests', () => {
    describe('Car Management Component', () => {
        let comp: CarComponent;
        let fixture: ComponentFixture<CarComponent>;
        let service: CarService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DocumentCarMysqlTestModule],
                declarations: [CarComponent],
                providers: []
            })
                .overrideTemplate(CarComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CarComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CarService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Car(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.cars[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
