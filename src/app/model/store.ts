/* eslint-disable @typescript-eslint/naming-convention */

import { StoreCategory } from './store-category';

export class Store {

    id: number;
    name: string;
    address: string;
    neighborhood: string;
    phone_number: string;
    start_time: string;
    end_time: string;
    image_logo: string;
    delivery_fee: number;
    minimum_order: number;
    delivery_time: number;
    business_status: string;
    CategoryId: number;
    Category: StoreCategory;
    //Aux

}
