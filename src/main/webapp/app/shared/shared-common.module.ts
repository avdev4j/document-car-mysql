import { NgModule } from '@angular/core';

import { DocumentCarMysqlSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [DocumentCarMysqlSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [DocumentCarMysqlSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class DocumentCarMysqlSharedCommonModule {}
