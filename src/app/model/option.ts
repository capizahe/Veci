import { OptionValues } from './option-values';

/* eslint-disable @typescript-eslint/naming-convention */
export class Option {

    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    ProductId: number;
    OptionValues: OptionValues[];

}
