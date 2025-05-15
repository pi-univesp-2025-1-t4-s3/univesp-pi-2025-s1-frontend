import axios from "axios"
import { CookieManager } from "../../services/cookieservice"


export default async function loader() {

    try {

        const creds = JSON.parse(await new CookieManager().get() as string)

        const res = await axios.get('https://inarisys.koyeb.app/produtos', {
            headers: {
                "Authorization": `Bearer ${creds.token}`
            }
        })

        if(res.status == 200){
            return res.data  
        }
        
        throw new Error('error when consulting products')
    } catch (error) {
        return []
    }
}