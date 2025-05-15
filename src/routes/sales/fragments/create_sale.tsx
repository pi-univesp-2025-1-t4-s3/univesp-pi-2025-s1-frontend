import { useRef, useState } from "react"
import { create_Sale, handle_ItemSales_Quantity, handle_Select_Product, searchProducts } from "./create_sale_process"
import { Message } from "../../../assets/components/message/message"

import style from './css/create_Sale.module.css'
import { ClickOutside } from "../../../assets/components/clickoutside/clickoutside"
import { Sale } from "../sales"

interface Props {

    refreshSales: (sale:Sale) => void

}

export function Create_Sale({refreshSales} : Props) {

    const [products, setProducts] = useState<{id: number, nome: string, preco: number}[]>([])

    const [selected, setSelected] = useState<{id: number, nome: string, preco: number, quantidade: number}[]>([])

    const [search, setSearch] = useState('')

    const empty_MessageInfo = { show: false, message: ''}
    const [messageInfo, setMessageInfo] = useState(empty_MessageInfo)
    const MessageRef = useRef<HTMLElement>(null)

    const [showCreateBox, setShowCreateBox] = useState(false)
    const createBoxRef = useRef<HTMLDivElement>(null)


    ClickOutside({popupState:messageInfo.show, closeAction:() => setMessageInfo(empty_MessageInfo), ref:MessageRef})
    ClickOutside({popupState:showCreateBox, closeAction:() => setShowCreateBox(false), ref:createBoxRef})

    function conclusion(signal: number) {

        switch (signal) {

            case 1 :
                setMessageInfo({show: true, message: 'Venda criada com sucesso'})
            break;

            case 0 :
                setMessageInfo({show: true, message: 'Ocorreu algum erro interno, tente novamente mais tarde'})
            break;

            default :
                setMessageInfo({show: true, message: 'Quantidade indisponível, verifique o estoque de cada item e tente novamente'})
            break;
        }

        setSearch('')
        setProducts([])
        setSelected([])
    }


    return (
        <article className={style.create_sale_container}>

            <button onClick={() => setShowCreateBox(true)}>Nova venda</button>

            {
               showCreateBox && (

                <div className={style.createBox_popup} >

                    <article ref={createBoxRef}>

                        <section className={style.products_section_createsale}>
                            <h1>Produtos:</h1>
                            
                            <div className={style.searchbox_products_createsale}>

                                <input type="text" placeholder="buscar produto pelo nome" value={search} onChange={e => setSearch(e.target.value)}/>
                                <button onClick={() => searchProducts(search, setProducts)}>buscar</button>

                            </div>

                            <div className={style.createsale_products_list}>

                                {
                                    products && (

                                        products.map(el => {

                                            return <div className={style.createsale_product_item} key={el.id}>

                                                <label>

                                                    <input type="checkbox" onChange={e => handle_Select_Product({product: el, event:e, products: selected, setProducts: setSelected })}/>
                                                    <p></p>

                                                </label>

                                                <p>Nome: {el.nome}</p>

                                            </div>
                                        })
                                    )
                                }

                            </div>
                        </section>



                        <section className={style.selected_section_createsale}>

                            <h1>Selecionados:</h1>

                            <div className={style.createsale_selected_list}>

                                {
                                    selected && (
                                        selected.map(el => {

                                            return <div className={style.createsale_selected_item} key={el.id}>
                                                
                                                <p>Nome: {el.nome}</p>

                                                <label>
                                                    <p>Quantidade:</p>
                                                    <input type="number" min={1} value={el.quantidade} onChange={e => handle_ItemSales_Quantity({id: el.id, event: e, setSelected: setSelected})}/>
                                                </label>
                                            </div>
                                        })
                                    )
                                }

                            </div>

                            <button onClick={async () => create_Sale(selected,refreshSales, conclusion)}>Registrar venda</button>

                        </section>

                    </article>

                </div>


               )
            }

            {
                messageInfo.show && (

                    <Message style={style} message={messageInfo.message} ref={MessageRef}/>
                )
            }

        </article>
    )
}