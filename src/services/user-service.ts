import dotenv from "dotenv"
import querystring from "querystring"
import axios from "axios"

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

        const user = await axios.get('https://discord.com/api/users/@me', {
            headers : {
                Authorization : `Bearer ${response.data}`
            }
        })

        return "TOKEN"
    }
}