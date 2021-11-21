import { ProductCategory } from "./product-category";

export class Product {

    id: number;
    storeId: number;
    price: number;
    discountPrice: number;
    availability: boolean;
    imageUrl: string;
    name: string;
    createdAt: Date;
    modifiedAt: Date;
    ProductCategory: ProductCategory;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    Options: any;
}
