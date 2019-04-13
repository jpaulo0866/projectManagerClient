import { IPaginationComponent } from '../interface/pagination.interface.component';
import { ResponseApi } from 'src/app/model/response.api';
import { CrudBaseService } from 'src/app/services/interface/crud.interface.service';

export abstract class PaginationComponent<T> implements IPaginationComponent {
    public page = 0;
    public count = 5;
    public totalElements = 0;
    public first = false;
    public last = false;
    public pages: Array<number> = new Array();
    message: {};
    classCss: {};
    public objectKeys = Object.keys;
    public objectValues = Object.values;

    public abstract listObject: Array<T>;
    public abstract getService(): CrudBaseService<T>;

    public setNextPage(event: any): void {
        event.preventDefault();
        if (this.page + 1 < this.pages.length) {
            this.page += 1;
            this.findAll(this.page, this.count);
        }
    }

    public setPreviousPage(event: any): void {
        event.preventDefault();
        if (this.page > 0) {
            this.page -= 1;
            this.findAll(this.page, this.count);
        }
    }

    public setPage(i: number, event: any): void {
        event.preventDefault();
        this.page = i;
        this.findAll(this.page, this.count);
    }

    public findAll(page: number, count: number, field?: string, order?: string) {
        this.message = '';
        this.getService().findAll(page, count, field, order).subscribe((response: ResponseApi) => {
            this.listObject = response.data.content;
            this.pages = new Array(response.data.totalPages);
            this.first = response.data.first;
            this.last = response.data.last;
            this.totalElements = response.data.totalElements;
        }, err => {
            console.log(err);
            this.showMessage({
                type: 'error',
                text: err.error.errors ? err.error.errors[0] : err.error.message
            });
        });
    }

    public showMessage(message: { type: string, text: string }): void {
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
}
