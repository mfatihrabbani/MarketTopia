import prisma from "../../src/apps/database"

export class ProductUtil {
    static async delete() {
        await prisma.product.deleteMany({
            where : {
                store_id: "123"
            }
        })
    }

    static async create(){
        await prisma.product.create({
            data: {
                product_id: "1234test",
                store_id: "123",
                product_name: "test_product",
                product_description: "Product ini bagus sekali",
                category_id: "ACCOUNT",
                payment_method: "DEPOSIT_WORLD_LOCK",
                price: 1000,
                is_active: true,
                total_sold: 0,
                image_url: "test"
            }
        })
    }
}