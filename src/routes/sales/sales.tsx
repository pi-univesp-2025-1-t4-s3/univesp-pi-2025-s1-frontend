import { Link, useLoaderData } from "react-router";
import { Sales_Table } from "./fragments/sales_table";
import { useState } from "react";
import { Sales_Filter } from "./fragments/sales_filter";
import { Create_Sale } from "./fragments/create_sale";

import style from './sales.module.css'

export type Sale = {

    id: number, 
    data: string,
    itens: {
        id: number,
        quantidade: number,
        produto: {
            id: number,
            nome: string,
            preco: number
        }
    }[]
}

export function Sales() {

    const loader = useLoaderData<Sale[]>()

    const [data, setData] = useState<Sale[]>([...loader])
    const [filtered, setFiltered] = useState<Sale[]>([...loader])


    function new_Sale(newSale: Sale) {

        if(newSale){

            setData(prev => [...prev, newSale])
            setFiltered(prev => [...prev, newSale])
        }
    }

    function delete_Sale(id:number){

        if(id){

            const  dataId = data.findIndex(el => el.id == id)
            const  filteredId = filtered.findIndex(el => el.id == id)

            if(dataId !== -1) {
                setData(prev => {

                    const tmp = [...prev]

                    tmp.splice(dataId, 1)

                    return tmp
                })
            }

            if(filteredId !== -1) {
                setFiltered(prev => {

                    const tmp = [...prev]

                    tmp.splice(dataId, 1)

                    return tmp
                })
            }
        }
    }

    return (
        <main className={style.salespage}>
        
            <header>
                <Link to='/menu'>Voltar</Link>
                <h1>Vendas</h1>
            </header>

            <section className={style.utils_sale_container}>

                <Sales_Filter sales={data} setSales={setFiltered}/>

                <Create_Sale refreshSales={new_Sale}/>

            </section>

            <Sales_Table data={filtered} refresh={delete_Sale}/>
        
        </main>
    )
}