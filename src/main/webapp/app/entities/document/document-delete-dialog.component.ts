import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from './document.service';

@Component({
    selector: 'jhi-document-delete-dialog',
    templateUrl: './document-delete-dialog.component.html'
})
export class DocumentDeleteDialogComponent {
    document: IDocument;

    constructor(private documentService: DocumentService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.documentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'documentListModification',
                content: 'Deleted an document'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-document-delete-popup',
    template: ''
})
export class DocumentDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ document }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DocumentDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.document = document;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
