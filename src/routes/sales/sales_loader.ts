import axios from "axios";
import { CookieManager } from "../../services/cookieservice";


export async function Sales_Loader() {

    try {
        
        const res = await axios.get('https://inarisys.koyeb.app/vendas', {
            headers: {
                    "Authorization": `Bearer ${JSON.parse( (await new CookieManager().get()) as string).token}`,
                    "Content-Type": 'application/json'
                }
        })

        if(res.status == 200) {

            return res.data
        }
    } catch (error) {
        return []
    }

}