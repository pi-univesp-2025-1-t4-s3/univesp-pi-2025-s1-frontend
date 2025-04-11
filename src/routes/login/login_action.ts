import { redirect } from "react-router";


//services 
import { CookieManager } from "../../services/cookieservice";
import axios from "axios";

export async function action({request}: {request: Request}){

    const formdata = await request.formData()

    let body = JSON.stringify(   Object.fromEntries(   formdata.entries()  ) )

    const res = await axios.post('https://inarisys.koyeb.app/auth/login',body, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    try {
        if(res.status == 200){

            const manager = new CookieManager()

            await manager.delete()
            await manager.set(JSON.stringify(await res.data))

            return redirect('/menu')
        }
        else if ( res.status == 403){
            throw Error("Unauthorized credentials")
        }
        else {
            throw Error("server authentication error. Please, try again later...")
        }
        
    } catch (error: any) {
        console.log(error)
        return {message: error.message, id: Date.now()}
    }
}