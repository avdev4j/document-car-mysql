import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Document } from 'app/shared/model/document.model';
import { DocumentService } from './document.service';
import { DocumentComponent } from './document.component';
import { DocumentDetailComponent } from './document-detail.component';
import { DocumentUpdateComponent } from './document-update.component';
import { DocumentDeletePopupComponent } from './document-delete-dialog.component';
import { IDocument } from 'app/shared/model/document.model';

@Injectable({ providedIn: 'root' })
export class DocumentResolve implements Resolve<IDocument> {
    constructor(private service: DocumentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Document> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Document>) => response.ok),
                map((document: HttpResponse<Document>) => document.body)
            );
        }
        return of(new Document());
    }
}

export const documentRoute: Routes = [
    {
        path: 'document',
        component: DocumentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'document/:id/view',
        component: DocumentDetailComponent,
        resolve: {
            document: DocumentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'document/new',
        component: DocumentUpdateComponent,
        resolve: {
            document: DocumentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'document/:id/edit',
        component: DocumentUpdateComponent,
        resolve: {
            document: DocumentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentPopupRoute: Routes = [
    {
        path: 'document/:id/delete',
        component: DocumentDeletePopupComponent,
        resolve: {
            document: DocumentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Documents'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
