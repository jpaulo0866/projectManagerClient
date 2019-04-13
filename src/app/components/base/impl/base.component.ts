import { IBaseComponent } from '../interface/base.interface.component';
import { CrudBaseService } from 'src/app/services/interface/crud.interface.service';
import { ResponseApi } from 'src/app/model/response.api';
import { EventEmitter } from '@angular/core';

export abstract class BaseComponent<T> implements IBaseComponent {
    message: {};
    classCss: {};
    readOnlyForm = false;
    private internalEvent = new EventEmitter<boolean>();
    private operationSucess: boolean;

    public abstract baseObject: T;
    public abstract getService(): CrudBaseService<T>;

    constructor() {
        this.internalEvent.subscribe((result) => {
            this.operationSucess = result;
        });
    }

    getFormGroupClass(isInvalid: boolean, isDirty): {} {
        return {
            'form-group': true,
            'has-error': isInvalid && isDirty,
            'has-sucess': !isInvalid
        };
    }

    showMessage(message: { type: string, text: string }): void {
        this.message = message;
        this.buildClasses(message.type);
        setTimeout(() => {
            this.message = undefined;
        }, 3000);
    }

    private buildClasses(type: string): void {
        this.classCss = {
            alert: true
        };

        this.classCss['alert-' + type] = true;
    }

    findById(id: string) {
        this.message = '';
        this.getService().findById(id).subscribe((response: ResponseApi) => {
            this.baseObject = response.data;
            this.internalEvent.emit(true);
        }, err => {
            this.showMessage({
                type: 'error',
                text: err.error.errors ? err.error.errors[0] : err.error.message
            });
            this.internalEvent.emit(false);
        });
    }

    delete(id: string) {
        this.message = '';
        this.getService().delete(id).subscribe((response: ResponseApi) => {
            this.showMessage({
                type: 'sucess',
                text: 'Object Sucessfully deleted.'
            });
            this.internalEvent.emit(true);
        }, err => {
            this.showMessage({
                type: 'error',
                text: err.error.errors ? err.error.errors[0] : err.error.message
            });
            this.internalEvent.emit(false);
        });
    }

    save() {
        this.message = '';
        this.getService().createOrUpdate(this.baseObject).subscribe((response: ResponseApi) => {
            this.baseObject = response.data;
            this.showMessage({
                type: 'sucess',
                text: 'Object Saved'
            });
            this.internalEvent.emit(true);
        }, err => {
            this.showMessage({
                type: 'error',
                text: err.error.errors ? err.error.errors[0] : err.error.message
            });
            this.internalEvent.emit(false);
        });
    }

}
