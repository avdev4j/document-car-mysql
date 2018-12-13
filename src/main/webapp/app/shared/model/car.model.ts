import { IDocument } from 'app/shared/model//document.model';

export interface ICar {
    id?: number;
    model?: string;
    documents?: IDocument[];
}

export class Car implements ICar {
    constructor(public id?: number, public model?: string, public documents?: IDocument[]) {}
}
