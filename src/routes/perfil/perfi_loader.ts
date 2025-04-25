import { redirect } from "react-router";
import { CookieManager } from "../../services/cookieservice";


export async function Loader() {

    try {
        const user=  JSON.parse(await new CookieManager().get() as string).split('.')

        if(user) {

            let tmp:any = Buffer.from(user[1], 'base64').toJSON()

            return tmp.sub
        }
        throw new Error()
    } catch (error) {
        return redirect('/menu')
    }
}