import dotenv from "dotenv"
import querystring from "querystring"
import axios from "axios"
import prisma from "../apps/database"
import { ResponseError } from "../errors/response-error"

dotenv.config()
export class UserService {
    static loginDiscord(): String {
        const urlQuery = querystring.stringify({
            client_id : process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: process.env.REDIRECT_URI,
            response_type: 'code',
            scope: 'identify',
        })
        return urlQuery
    }
    
    static async callbackDiscordLogin(code: string):Promise<string> {
        const response = await axios.post('https://discord.com/api/oauth2/token', querystring.stringify({
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.REDIRECT_URI,
                scope: 'identify',
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        )

        const {access_token} = response.data

        let user = await axios.get('https://discord.com/api/users/@me', {
            headers : {
                Authorization : `Bearer ${response.data}`
            }
        })

        if(!user.data){
            throw new ResponseError(404, "Something wrong with discord Oauth")
        }

        const isUserExist = await prisma.user.findFirst({
            where : {
                user_id : user.data.id
            }
        })

        if(!isUserExist){
            await prisma.user.create({
                data : {
                    user_id : user.data.id,
                    username : user.data.username,
                    avatar : user.data.avatar,
                    token : access_token,
                }
            })
        }

        return access_token
    }
}