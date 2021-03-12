import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
@NgModule({
    declarations: [],
    imports: [NzIconModule, NzInputModule, NzButtonModule],
    providers: [],
    entryComponents: [],
    exports: [ NzIconModule, NzInputModule, NzButtonModule]
})

export class SharedModule { }
