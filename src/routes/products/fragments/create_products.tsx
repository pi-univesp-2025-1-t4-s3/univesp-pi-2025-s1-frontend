import axios from "axios"
import { Form } from "react-router"
import { CookieManager } from "../../../services/cookieservice"
import { useRef, useState } from "react"
import { Message, MessageContentInterface } from "../../../assets/components/message/message"
import { ClickOutside } from "../../../assets/components/clickoutside/clickoutside"


import style from './css/create_products.module.css'
import { ProductsInterface } from "../products.type"

type formNewProductInterface = {
    nome: string,
    preco: number,
    descricao: string
}

type Props = {

    refreshProducts: React.Dispatch<React.SetStateAction<ProductsInterface[]>>
}

export function CreateProductsButton( {refreshProducts}: Props) {

    const emptyform:formNewProductInterface = { nome: '', preco: 0, descricao: ''}

    const [formdata, setformdata] = useState<formNewProductInterface>(emptyform)

    const [createproductPopup, setCreateproductPopup] = useState(false)
    const [messagePopup, setMessagePopup] = useState(false)

    const [messageContent, setMessageContent] = useState<MessageContentInterface>({message: ''}) 

    const formRef = useRef<any>(null)
    const messageRef = useRef<any>(null)

    ClickOutside({popupState: createproductPopup, ref: formRef, closeAction: () => {setCreateproductPopup(false)}})

    ClickOutside({popupState: messagePopup, ref: messageRef, closeAction: () => {setMessagePopup(false)}})


    async function handleSubmitNewProduct() {

        if(formdata && Object.values(formdata).every(Boolean)){

            let api = await axios.post('https://inarisys.koyeb.app/produtos', JSON.stringify(formdata), {
                headers: {
                    "Authorization": `Bearer ${JSON.parse( (await new CookieManager().get()) as string).token}`,
                    "Content-Type": 'application/json'
                }
            })
    
    
            if(api.status == 201) {

                const tmp: ProductsInterface = api.data

                api = await axios.post(
                `https://inarisys.koyeb.app/estoques/produto/${tmp.id}/incrementar`, 1, {
                    headers: {
                        'Authorization': `Bearer ${JSON.parse((await new CookieManager().get()) as string).token}`,
                        'Content-Type': 'application/json'
                    }
                })

                if(api.status == 204){
                    
                    setMessagePopup(true)

                    setMessageContent({message: "Produto criado com sucesso"})

                    refreshProducts(prev => [...prev, tmp])
                    return
                }
                
            }

            setMessagePopup(true)

            setMessageContent({message: "Falha na criação, tente novamente"})
        }
        else {

            setMessagePopup(true)

            setMessageContent({message: "Preencha corretamente os campos"})
        }

        setformdata(emptyform)
        setCreateproductPopup(false)

    }

    return (
        <article className={style.create_products_container_procuctpage}>

            <button onClick={() => setCreateproductPopup(!createproductPopup)}>Produto novo +</button>

            {
              createproductPopup && (

                    <Form ref={formRef}>

                        <label>
                            <p>Nome:</p>
                            <input type="text" name="nome" required onChange={ e => setformdata({...formdata, nome: e.currentTarget.value})}/>
                        </label>

                        <label>
                            <p>Preço:</p>
                            <input type="number" name="preco" step={0.01} required onChange={ e => setformdata({...formdata, preco: Number.parseFloat(e.currentTarget.value)})}/>
                        </label>

                        <label has-textarea-create-product-form="true">
                            <p>Descrição:</p>
                            <textarea name="descricao" required onChange={ e => setformdata({...formdata, descricao: e.currentTarget.value})}></textarea>
                        </label>

                        <button onClick={handleSubmitNewProduct}>Criar</button>

                    </Form>
                )
            }

            {
                messagePopup && (<Message style={style} message={messageContent.message} ref={messageRef}/>)
            }
        </article>
    )
}