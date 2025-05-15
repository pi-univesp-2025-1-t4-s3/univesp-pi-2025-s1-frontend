import { redirect } from "react-router";


//services 
import { CookieManager } from "../../services/cookieservice";
import axios from "axios";

export async function action({request}: {request: Request}){

    const formdata = await request.formData()

    try {
        let body = JSON.stringify(   Object.fromEntries(   formdata.entries()  ) )

        const res = await axios.post('https://inarisys.koyeb.app/auth/login',body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

    
        if(res.status == 200){

            const manager = new CookieManager()

            await manager.delete()
            await manager.set(JSON.stringify(res.data))

            return redirect('/menu')
        }
        
    } catch (error: any) {
        if(error.message.includes('403')){
            return {message: 'Credenciais não autorizadas', id: Date.now()}
        }
        
        return {message: 'Ocorreu erros internos no servidor, tente novamente mais tarde', id: Date.now()}
    }
}