import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ICar } from 'app/shared/model/car.model';
import { CarService } from './car.service';

@Component({
    selector: 'jhi-car-update',
    templateUrl: './car-update.component.html'
})
export class CarUpdateComponent implements OnInit {
    car: ICar;
    isSaving: boolean;

    constructor(private carService: CarService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ car }) => {
            this.car = car;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.car.id !== undefined) {
            this.subscribeToSaveResponse(this.carService.update(this.car));
        } else {
            this.subscribeToSaveResponse(this.carService.create(this.car));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICar>>) {
        result.subscribe((res: HttpResponse<ICar>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
}
