export class Product {

    id: number;
    storeId: number;
    category: string;
    price: number;
    discountPrice: number;
    availability: boolean;
    imageUrl: string;
    name: string;
    createdAt: Date;
    modifiedAt: Date;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    Options: any;
}
