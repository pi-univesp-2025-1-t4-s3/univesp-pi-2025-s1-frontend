import axios from "axios";
import { ProductsInterface } from "../products.type";
import { CookieManager } from "../../../services/cookieservice";


type Props = {

    id:number,
    refresh: React.Dispatch<React.SetStateAction<ProductsInterface[]>>,
    setMessageContent: React.Dispatch<React.SetStateAction<{
        message: string,
        show: boolean
    }>>
}

export async function DeleteProduct({id, refresh, setMessageContent}: Props) {


    try {
        if(id) {

            const res = await axios.delete(`https://inarisys.koyeb.app/produtos/${id}`, {
                headers: {
                    "Authorization": `Bearer ${JSON.parse((await new CookieManager().get()) as string).token}`
                }
            })

            if(res.status == 204) {
                refresh(prev => {

                    return prev.filter( el => el.id != id)
                })
            }
        }
    } catch (error) {
        console.log(error)
        setMessageContent({show: true, message: 'Ocorreu algum erro na remoção do produto, tente novamente mais tarde'})
    }
} 