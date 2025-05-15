import { useRef, useState } from "react"
import { Sale } from "../sales"
import { ClickOutside } from "../../../assets/components/clickoutside/clickoutside"

import style from './css/sales_table.module.css'
import { Sale_DeleteAction } from "./sales_table_process"

type Props = {

    data: Sale[],
    refresh: (id: number) => void
}

export function Sales_Table({data, refresh}: Props) {

    const emptySaleInfo: {show: boolean, info: Sale | null} = { show: false, info: null} 
    const [SaleInfo, setSaleInfo] = useState(emptySaleInfo)

    const saleinfoRef = useRef<HTMLDivElement>(null)

    ClickOutside({popupState:SaleInfo.show, closeAction:() => setSaleInfo(emptySaleInfo), ref:saleinfoRef})

    return (
        <section className={style.table_sales_container_salepage}>

            <table>

                <thead> 
                    <tr className={style.sales_tr_header}>
                        <th>Data</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>

                    {
                        data && (
                            data.map(el => {

                                return <tr key={el.id} className={style.salepage_td_has_buttons}>
                                    <td>{new Date(el.data).toLocaleDateString()}</td>
                                    <td className={style.salepage_td_has_buttons}>
                                        <button onClick={() => { setSaleInfo({show:true, info: el})}}>saiba mais</button>
                                        <button className={style.sale_button_delete} onClick={() => Sale_DeleteAction(el.id, refresh)}>cancelar venda</button>
                                    </td>
                                </tr>
                            })
                        )
                    }

                </tbody>

            </table>

            {
                SaleInfo.show && (

                    <div  className={style.details_sale_container}>

                        <article ref={saleinfoRef}>
                            {
                                SaleInfo.info?.itens.map(el => {

                                    return <div key={el.id} className={style.product_item_detail_sale}>
                                        <p><strong>Produto:</strong> {el.produto.nome}</p>
                                        <p><strong>Quantidade:</strong> {el.quantidade}</p>
                                    </div>
                                })
                            }

                            {
                                SaleInfo.info?.itens.length && (
                                    <p><strong>Total:</strong> R$ {String(SaleInfo.info?.itens.reduce((total, el) => (el.quantidade * el.produto.preco) + total, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00')}</p>
                                )
                            }
                        </article>

                    </div>
                )
            }

        </section>
    )
}