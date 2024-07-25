import { User } from "@prisma/client";
import {
  GetProductParams,
  ObjectValidateProductReq,
  ProductCreateRequest,
  ProductDeleteRequest,
  ProductDeleteResponse,
  ProductGetResponse,
  ProductUpdateRequest,
  ProductUpdateResponse,
  QueryParamsGetAll,
} from "../models/product-model";
import { Validation } from "./validation";
import { ProductValidation } from "../validations/product-validation";
import prisma from "../apps/database";
import { StoreService } from "./store-service";
import { ResponseError } from "../errors/response-error";
import { v4 as uuid } from "uuid";

export class ProductService {
  static async basicValidate(
    user: User,
    product: ObjectValidateProductReq
  ): Promise<string> {
    const storeId = await StoreService.getStoreIdByUserId(user.user_id);

    if (!storeId) {
      throw new ResponseError(404, "Store not found");
    }

    const totalProduct = await prisma.product.count({
      where: {
        store_id: user.user_id,
      },
    });

    if (totalProduct > 5) {
      throw new ResponseError(400, "Limit create product");
    }

    const existCategory = await prisma.category.findFirst({
      where: {
        category_id: product.category_id,
      },
    });

    if (!existCategory) {
      throw new ResponseError(404, "Category not found");
    }

    const existPaymentMethod = await prisma.paymentMethod.findFirst({
      where: {
        payment_id: product.payment_method,
      },
    });

    if (!existPaymentMethod) {
      throw new ResponseError(404, "Payment method not found");
    }

    return storeId;
  }

  static async create(user: User, product: ProductCreateRequest) {
    product = Validation.validate(ProductValidation.CREATE, product);

    const storeId = await this.basicValidate(user, {
      category_id: product.category_id,
      payment_method: product.payment_method,
    });

    product = await prisma.product.create({
      data: {
        product_id: uuid(),
        store_id: storeId,
        product_name: product.product_name,
        product_description: product.product_description,
        category_id: product.category_id,
        payment_method: product.payment_method,
        price: product.price,
        total_sold: 0,
        is_active: true,
        is_delete: false,
        image_url: null,
      },
    });

    return {
      product_id: uuid(),
      product_name: product.product_name,
      product_description: product.product_description,
      category_id: product.category_id,
      payment_method: product.payment_method,
      price: product.price,
      total_sold: 0,
      is_active: true,
    };
  }

  static async update(
    user: User,
    product: ProductUpdateRequest
  ): Promise<ProductUpdateResponse> {
    product = Validation.validate(ProductValidation.UPDATE, product);

    const existProduct = await prisma.product.findFirst({
      where: {
        product_id: product.product_id,
      },
    });

    if (!existProduct) {
      throw new ResponseError(404, "Product not found");
    }

    if (existProduct?.is_delete) {
      throw new ResponseError(404, "Product has been deleted");
    }

    const storeId = await this.basicValidate(user, {
      category_id: product.category_id,
      payment_method: product.payment_method,
    });

    const newProduct = await prisma.product.update({
      data: {
        product_name: product.product_name,
        product_description: product.product_description,
        category_id: product.category_id,
        payment_method: product.payment_method,
        price: product.price,
      },
      where: {
        product_id: product.product_id,
      },
    });

    return {
      product_id: uuid(),
      product_name: newProduct.product_name,
      product_description: newProduct.product_description,
      category_id: newProduct.category_id,
      payment_method: newProduct.payment_method,
      price: newProduct.price,
      total_sold: newProduct.total_sold,
      is_active: newProduct.is_active,
      image_url: newProduct.image_url,
    };
  }

  static async getAll(query: QueryParamsGetAll): Promise<ProductGetResponse[]> {
    const filters: any = {};
    if (query.most_sold) {
      filters.orderBy = {
        total_sold: "desc",
      };
    }

    const products = await prisma.product.findMany({
      orderBy: filters.orderBy,
      take: query.size,
      include: {
        store: true,
      },
    });

    const productWithStock = await Promise.all(
      products.map(async (product) => {
        const totalStock = await prisma.stockProduct.count({
          where: {
            product_id: product.product_id,
            AND: [
              {
                is_sold: false,
              },
            ],
          },
        });

        return {
          image_url: product.image_url,
          product_id: product.product_id,
          product_name: product.product_name,
          product_description: product.product_description,
          total_sold: product.total_sold,
          price: product.price,
          total_stock: totalStock || 0,
          store_name: product.store.store_name,
        };
      })
    );

    return productWithStock;
  }

  static async delete(
    user: User,
    product: ProductDeleteRequest
  ): Promise<ProductDeleteResponse> {
    product = Validation.validate(ProductValidation.DELETE, product);

    const existProduct = await prisma.product.findFirst({
      where: {
        product_id: product.product_id,
      },
    });

    if (!existProduct) {
      throw new ResponseError(404, "Product not found");
    }

    if (existProduct?.is_delete) {
      throw new ResponseError(404, "Product has been deleted");
    }

    await prisma.product.update({
      data: {
        is_delete: true,
      },
      where: {
        product_id: product.product_id,
      },
    });

    return {
      message: "Success delete product",
    };
  }

  static async getById(
    productId: GetProductParams
  ): Promise<ProductGetResponse> {
    productId = Validation.validate(ProductValidation.GETBYID, productId);

    console.log("PASS SERVICE");

    const existProduct = await prisma.product.findFirst({
      where: {
        product_id: productId,
      },
    });

    if (!existProduct) {
      throw new ResponseError(404, "Product not found");
    }

    const totalStock = await prisma.stockProduct.count({
      where: {
        product_id: productId,
        AND: [
          {
            is_sold: false,
          },
        ],
      },
    });

    return {
      store_id: existProduct.store_id,
      image_url: existProduct.image_url,
      product_id: existProduct.product_id,
      product_name: existProduct.product_name,
      category_id: existProduct.category_id,
      payment_method: existProduct.payment_method,
      product_description: existProduct.product_description,
      total_sold: existProduct.total_sold,
      price: existProduct.price,
      total_stock: totalStock || 0,
    };
  }

  static async getByStore(
    storeId: GetProductParams
  ): Promise<ProductGetResponse[]> {
    storeId = Validation.validate(ProductValidation.GETBYSTORE, storeId);

    const existStore = await prisma.store.findFirst({
      where: {
        store_id: storeId,
      },
    });

    if (!existStore) {
      throw new ResponseError(404, "Store not found");
    }

    const products = await prisma.product.findMany({
      where: {
        store_id: storeId,
        AND: [
          {
            is_delete: false,
          },
        ],
      },
      include: {
        store: true,
      },
    });

    const productWithStock = await Promise.all(
      products.map(async (product) => {
        const totalStock = await prisma.stockProduct.count({
          where: {
            product_id: product.product_id,
            AND: [
              {
                is_sold: false,
              },
            ],
          },
        });

        return {
          image_url: product.image_url,
          product_id: product.product_id,
          product_name: product.product_name,
          category_id: product.category_id,
          payment_method: product.payment_method,
          product_description: product.product_description,
          store_name: product.store.store_name,
          store_id: product.store.store_id,
          total_sold: product.total_sold,
          price: product.price,
          total_stock: totalStock || 0,
        };
      })
    );

    return productWithStock;
  }
}
