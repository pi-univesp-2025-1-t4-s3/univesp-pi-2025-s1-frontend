import { redirect } from "react-router";
import { CookieManager } from "../../services/cookieservice";


export default async function Loader() {

    try {
        const user=  JSON.parse(await new CookieManager().get() as string).token.split('.')

        if(user) {


            return JSON.parse(window.atob(user[1])).sub
        }
        throw new Error()
    } catch (error) {
        console.log(error)
        return redirect('/menu')
    }
}