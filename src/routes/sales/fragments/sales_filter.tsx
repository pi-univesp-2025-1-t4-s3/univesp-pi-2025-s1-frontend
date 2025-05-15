import { useState } from "react"
import { Sale } from "../sales"
import { SalesFilterProccess } from "./sales_filter_process"

import style from './css/sales_filter.module.css'

type Props = {

    sales: Sale[], 
    setSales: React.Dispatch<React.SetStateAction<Sale[]>>
}

export function Sales_Filter({sales, setSales}: Props) {


    const empty_filterInfo = {date: {min: '', max: ''}, product: ''}
    const [filterInfo, setFilterInfo] = useState<{date:{min: string, max: string}, product: string}>(empty_filterInfo)

    return (
        <article className={style.sales_filter_container}>

            <div className={style.filter_date_fields_box}>

                <label>
                    <p>Início:</p>
                    <input type="date" value={filterInfo.date.min} onChange={e => setFilterInfo({...filterInfo, date: { ...filterInfo.date, min: e.target.value}})}/>

                </label>

                <label>
                    <p>Final:</p>
                    <input type="date" value={filterInfo.date.max} onChange={e => setFilterInfo({...filterInfo, date: { ...filterInfo.date, max: e.target.value}})}/> 

                </label>

            </div>

            <label className={style.filter_product_field_box}>

                <p>Produto:</p>
                <input type="text" value={filterInfo.product} onChange={e => setFilterInfo({...filterInfo, product: e.target.value })}/>

            </label>

            <div className={style.filter_actions_box}>

                <button onClick={() => SalesFilterProccess({filterInfo: filterInfo, sales: sales, applyFilter: setSales})}>Filtrar</button>
                <button onClick={() => {setFilterInfo(empty_filterInfo); setSales(sales)}}>Limpar filtros</button>

            </div>

        </article>
    )
}