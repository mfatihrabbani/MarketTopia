import prisma from "../../src/apps/database";

export class StoreUtil {
    static async deleteAll() {
        await prisma.store.deleteMany({
            where : {
                user_id: "test"
            }
        })
    }
}