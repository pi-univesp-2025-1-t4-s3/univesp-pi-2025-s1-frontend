import axios from "axios"
import React, { useState, useRef } from "react"
import { CookieManager } from "../../../services/cookieservice"
import { Message } from "../../../assets/components/message/message"

import style from './css/stock_table.module.css'
import { ClickOutside } from "../../../assets/components/clickoutside/clickoutside"

export type StockInterface = {

    id: number,
    quantidade: number,
    produto: {
        id: number,
        preco: number,
        nome: string,
        descricao: string
    }
}

type Props = {

    stock: StockInterface[],
    updateStock: React.Dispatch<React.SetStateAction<StockInterface[]>>
}

export function StockTable({stock, updateStock}: Props) {

    const defaultValueUpdateData = {altertype: "1", quantity: "1"}         //update box 
    const [ updateData, setupdateData] = useState(defaultValueUpdateData)

    const [currentItem, setCurrentItem] = useState<number>()                

    const [ showPopup, setShowPopup ] = useState(false)                    
    const updateBoxRef = useRef<HTMLElement>(null)


    const [ messageContent, setMessageContent] = useState({ message: ''})  //message
    const messageRef = useRef<HTMLDivElement>(null)
    const [showmessage, setShowmessage] = useState(false)


    ClickOutside({popupState: showPopup, closeAction: () => setShowPopup(false), ref: updateBoxRef})  //click outside listeners

    function  closeMessage() {
        setShowmessage(false)
        setMessageContent({message: ''})
    }
    
    ClickOutside({popupState: showmessage, closeAction: closeMessage, ref: messageRef})

    async function updateQuantity() {             // mechanism of modify quantity 

        try {
            if(currentItem && Object.values(updateData).every(item => Boolean(item.trim()))){

                const res = await axios.post(
                `https://inarisys.koyeb.app/estoques/produto/${currentItem}/${Number(updateData.altertype)? 'incrementar': 'decrementar'}`, Number(updateData.quantity), {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse((await new CookieManager().get()) as string).token}`,
                        'Content-Type': 'application/json'
                    }
                })

                if(res.status == 204) {

                    updateStock(prev => {

                        if(Number(updateData.altertype)){
                            return prev.map(el => {

                                if(el.produto.id == currentItem){
                                    el.quantidade += Number(updateData.quantity)
                                }
    
                                return el
                            })
                        }
                        

                        return prev.map(el => {

                            if(el.produto.id == currentItem && (el.quantidade - Number(updateData.quantity)) >= 0){
                                el.quantidade -= Number(updateData.quantity)
                            }

                            return el
                        })
                    })

                    setShowmessage(true)
                    setMessageContent({message: 'Modificado com sucesso a quantidade'})
                    return
                }

                throw new Error('An error occurred while modifying the quantity of stock')

            }

            setShowmessage(true)
            setMessageContent({message: 'Preencha os campos com valores válidos, por favor'})
        } catch (error) {
            console.log(error)
            setShowmessage(true)
            setMessageContent({message: 'Ocorreu um erro durante a modificação da quantidade, tente novamente mais tarde'})
        }

        setShowPopup(false)
        setCurrentItem(NaN)
    }

    return (

        <section className={style.table_stock_container_stockpage}>

            <table>

                <thead>
                    <tr stock-table-tr-header="true">
                        <td>
                            Quantidade
                        </td>

                        <td>
                            Produto/Nome
                        </td>

                        <td></td>
                    </tr>
                </thead>

                <tbody>
                    {
                        stock && (
                            stock.map( (el: StockInterface) => {

                                return <tr key={el.id}>

                                    <td>{el.quantidade}</td>
                                    <td>{el.produto.nome}</td>
                                    <td>
                                        <button onClick={() => {setShowPopup(true); setCurrentItem(el.produto.id)}}>atualizar</button>
                                    </td>
                                </tr>
                            })
                        )
                    }
                </tbody>

            </table>

            {
                showPopup && (
                    <div className={style.update_popup_stock_container}>
                        <article ref={updateBoxRef}>
                            <h1>Atualizar quantidade:</h1>

                            <div>

                                <select value={updateData.altertype} onChange={e => setupdateData({...updateData, altertype: e.target.value})}>
                                    <option value="1">mais</option>
                                    <option value="0">menos</option>
                                </select>

                                <input type="number" min={1}  value={updateData.quantity} onChange={e => setupdateData({...updateData, quantity: e.target.value})}/>

                                <button onClick={async () => await updateQuantity()}>Atualizar</button>
                            </div>
                        </article>


                    </div>
                )
            }

            {
                showmessage && (
                    <Message style={style} message={messageContent.message} ref={messageRef}/>
                )
            }

        </section>
    )
}