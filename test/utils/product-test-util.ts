import prisma from "../../src/apps/database"

export class ProductUtil {
    static async delete() {
        await prisma.product.deleteMany({
            where : {
                store_id: "123"
            }
        })
    }
}