import axios from "axios"
import { ChangeEvent } from "react"
import { CookieManager } from "../../../services/cookieservice"
import { Sale } from "../sales"

type ItemSalesQuantityProps = {

    id: number,
    event: ChangeEvent,
    setSelected: React.Dispatch<React.SetStateAction<{id: number, nome: string, preco: number, quantidade: number}[]>>

}

type SelectProductsProps = {

    product: {id: number, nome: string, preco: number},
    event: ChangeEvent,
    products: {id: number, nome: string, preco: number, quantidade: number}[],
    setProducts: React.Dispatch<React.SetStateAction<{id: number, nome: string, preco: number, quantidade: number}[]>>
}

export async function handle_ItemSales_Quantity({id, event, setSelected}: ItemSalesQuantityProps) {

    setSelected(prev => {

        const index = prev.findIndex(el => el.id === id)

        if(index == -1){
            return prev
        }

        let tmp = [...prev] 

        tmp[index] = {...prev[index], quantidade: Number((event.target as HTMLInputElement).value)}

        return tmp
    })
}

export async function handle_Select_Product({product, event, products, setProducts}: SelectProductsProps){

    if((event.target as HTMLInputElement).checked) {
        const index = products.findIndex(el => el.id === product.id)

        if(index === -1){

            let tmp = [...products, {...product, quantidade: 1}]

            setProducts(tmp)
        }
    }
    else {

        const index = products.findIndex(el => el.id === product.id)
        if(index !== -1){

            let tmp = [...products]

            tmp.splice(index, 1)

            setProducts(tmp)
        }
    }
}

export async function searchProducts(search: string, refreshProducts: React.Dispatch<React.SetStateAction<{id: number, nome: string, preco: number}[]>>) {

try {
    if(search){

        const res = await axios.get(`https://inarisys.koyeb.app/produtos/busca?${new URLSearchParams({nome:search})}`, {
            headers: {
                "Authorization": `Bearer ${JSON.parse( (await new CookieManager().get()) as string).token}`
            }
        })

        if(res.status == 200) {
            refreshProducts(res.data)
        }
    
    }

    throw new Error('No products found')
} catch (error) {
    return 
}

}


export async function create_Sale(selected: {id: number, nome: string, preco: number, quantidade: number}[], refresh:(param:Sale) => void, conclusion: (sucess: number) => void) {

    if(selected && selected.length) {

        let tmp = {
            data: new Date().toISOString().slice(0,10),

            itens: selected.map(el => {

                return {
                    quantidade: el.quantidade,
                    produto: {
                        id:el.id,
                        nome: el.nome,
                        preco: el.preco
                    }
                }
            
            })
        }

        try {
            const res = await axios.post('https://inarisys.koyeb.app/vendas', JSON.stringify(tmp), {
                headers: {
                    "Authorization": `Bearer ${JSON.parse( (await new CookieManager().get()) as string).token}`,
                    "Content-Type": 'application/json'
                }
            })

            if(res.status == 201){
                refresh(Object.assign(tmp, {id: res.data.id}) as Sale)
                conclusion(1)
                return
            }

            throw new Error('unavailable product error')
        } catch (error ) {
            if((error as Error).message == 'unavailable product error' || ['400','403'].some(status => (error as Error).message.includes(status))){
                conclusion(2)
                return 
            }
            conclusion(0)
        }
    }

}