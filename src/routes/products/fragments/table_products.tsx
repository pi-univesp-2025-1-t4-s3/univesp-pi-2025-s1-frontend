import { useRef, useState } from "react";
import { ProductsInterface } from "../products.type";

import style from './css/table_products.module.css'
import { ClickOutside } from "../../../assets/components/clickoutside/clickoutside";
import { Message } from "../../../assets/components/message/message";
import { DeleteProduct } from "./delete_product_action";

type Props = {

    products: ProductsInterface[], 
    refreshProducts: React.Dispatch<React.SetStateAction<ProductsInterface[]>>
}

export function ProductsTable({products, refreshProducts}: Props) {

    const refDetailBox = useRef<HTMLDivElement|null>(null)

    const [ItemDetails, setItemDetails] = useState<string|null>(null)
    const [ShowDetailsPopUp, setShowDetailsPopUp] = useState(false)

    const default_messageInfo = {show:false, message: ''}
    const [messageInfo, setMessageInfo] = useState(default_messageInfo)
    const messageProductsTableRef = useRef<HTMLElement>(null)


    function closePopUp() {

        setItemDetails(null)
        setShowDetailsPopUp(false)
    }

    function openPopUp(el : string) {

        setItemDetails(el)
        setShowDetailsPopUp(true)
    }

    ClickOutside({popupState: ShowDetailsPopUp, closeAction: closePopUp, ref: refDetailBox})
    ClickOutside({popupState: messageInfo.show, closeAction: () => {setMessageInfo(default_messageInfo)}, ref: messageProductsTableRef})

    return (
        <section className={style.table_products_container_productpage}>
            <table>
                <thead>
                    <tr products-table-tr-header="true">
                        <th>Nome</th>
                        <th>Preço</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products && (
                            products.map((el: ProductsInterface) => {

                                return <tr key={el.id}>
                                    <td>{el.nome}</td>
                                    <td>{el.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                    <td className={style.productpage_td_has_buttons}>
                                        <button onClick={() => openPopUp(el.descricao)}>Descrição</button>
                                        <button className={style.product_button_delete} onClick={() => DeleteProduct({ id: el.id, refresh: refreshProducts, setMessageContent: setMessageInfo })}>X</button>
                                    </td>
                                </tr>
                            })
                        )
                    }
                </tbody>
            </table>

            {
                ShowDetailsPopUp && ItemDetails && (
                    <div className={style.descricao_popup_product_item} ref={refDetailBox}>
                        <h3>Descrição</h3>
                        <p>{ItemDetails}</p>
                    </div>
                )
            }

            {
                messageInfo.show && (

                    <Message message={messageInfo.message} ref={messageProductsTableRef} style={style}/>
                )
            }
        </section>
    )
}