import { ModelGenericTable } from './../model/generic.table';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'maskWithValidation'
})
export class MaskTransformPipe implements PipeTransform {
    transform(value: any, model: ModelGenericTable) {
        if (model && model.mask) {
            return MaskTransformPipe.maskFormat(value, model.mask);
        } else {
            return value;
        }
    }

    private static maskFormat(value: string, mask: string): string {
        let i = 0;
        let v = value.toString();
        return mask.replace(/#/g, _ => v[i++]);
    }
}