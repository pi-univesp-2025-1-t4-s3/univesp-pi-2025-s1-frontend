import { redirect } from "react-router";
import { CookieManager } from "./services/cookieservice"

import axios from 'axios'

export async function protected_routes_loader() {

   

    try {

        const creds: any = JSON.parse(await new CookieManager().get() as string);
        
        if(creds) {

            const res = await axios.get('https://inarisys.koyeb.app/', {
                headers: {
                    'Authorization': `Bearer ${creds.token}`,
                },
                
            })
            
            if(res.status == 200){
                return 
            }
            throw new Error('invalid credentials provided error')
        }

        throw new Error('no credentials provided error')
    } catch (error) {
        console.log('\n\nerror:\n\n' + error.message)
        return redirect('/login')
    }
}