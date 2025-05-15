import axios from "axios";
import { CookieManager } from "../../../services/cookieservice";


export async function Sale_DeleteAction(id: number, refresh: (id: number) => void) {

   try {
        if(id) {

            const res = await axios.delete(`https://inarisys.koyeb.app/vendas/${id}`, {
                headers: {
                    "Authorization": `Bearer ${JSON.parse( (await new CookieManager().get()) as string).token}`
                }
            })

            if(res.status == 204) {

                refresh(id)
            }
        }
   } catch (error) {
    console.log(error)
   }
}