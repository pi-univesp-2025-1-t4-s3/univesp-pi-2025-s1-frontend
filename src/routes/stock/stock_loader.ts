import axios from "axios"
import { CookieManager } from "../../services/cookieservice"

export async function stock_loader() {

    try {
        const res = await axios.get("https://inarisys.koyeb.app/estoques", {

            headers: {
                "Authorization": `Bearer ${JSON.parse((await new CookieManager().get()) as string).token}`,
            }
        })

        if(res.status == 200) {

            return res.data
        }

        throw new Error('error when consulting stock data')
    } catch (error) {
        return []
    }
}