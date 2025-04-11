import { redirect } from "react-router";
import { CookieManager } from "../services/cookieservice";


export async function loader() {

    await new CookieManager().delete()

    return redirect('/')
}