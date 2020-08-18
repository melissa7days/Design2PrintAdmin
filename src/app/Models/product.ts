import { Category } from './category';
import { ProductType } from './product-type';

export interface Product{
    productId: number;
    categoryId: Category;
    productTypeId: ProductType;
    productName: string;
    productBasePrice: number;
    productImage: string;
}