import { Sale } from "../sales"

type Props = {

    filterInfo: {
        date:{
            min: string, 
            max: string
        }, 
        product: string
    },
    sales: Sale[], 
    applyFilter: React.Dispatch<React.SetStateAction<Sale[]>>
}

export async function SalesFilterProccess({filterInfo, sales, applyFilter}: Props){

    let filtered = [...sales]

    if (!filterInfo.date.min && !filterInfo.date.max && !filterInfo.product) {
    return;
    }

    if(filterInfo.date.min) {
        console.log('min')
        filtered = filtered.filter( el => new Date(filterInfo.date.min ).getTime() < new Date(el.data).getTime())
    }

    if(filterInfo.date.max) {
        console.log('max')
        filtered = filtered.filter( el => new Date(filterInfo.date.max ).getTime() > new Date(el.data).getTime())
    }       

    if(filterInfo.product) {
        console.log('product')
        filtered = filtered.filter( el => el.itens.some(el => el.produto.nome.toLowerCase().includes(filterInfo.product.toLowerCase())  ))
    }

    applyFilter(filtered)
    
}