/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DocumentCarMysqlTestModule } from '../../../test.module';
import { CarDetailComponent } from 'app/entities/car/car-detail.component';
import { Car } from 'app/shared/model/car.model';

describe('Component Tests', () => {
    describe('Car Management Detail Component', () => {
        let comp: CarDetailComponent;
        let fixture: ComponentFixture<CarDetailComponent>;
        const route = ({ data: of({ car: new Car(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DocumentCarMysqlTestModule],
                declarations: [CarDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CarDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CarDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.car).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
