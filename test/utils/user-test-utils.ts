import prisma from "../../src/apps/database"

export class UserUtil {
    static async create() {
        await prisma.user.create({
            data : {
                user_id : "test",
                username : "test_id",
                avatar : "test_avatar",
                token : "token",
            }
        })
    }

    static async delete() {
        await prisma.user.deleteMany({
            where : {
                user_id: "test"
            }
        })
    }
}