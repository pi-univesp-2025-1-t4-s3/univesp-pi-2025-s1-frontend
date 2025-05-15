import { useEffect, useState } from "react"
import { StockInterface } from "./stock_table"

import style from './css/filter_stock.module.css'

type Props = {

    original: StockInterface[],
    updateStock: React.Dispatch<React.SetStateAction<StockInterface[]>>
}

export function FilterStock({original, updateStock}: Props) {

    const [ name, setName ] = useState('')
    
    useEffect(() => {

        if(name) {
            updateStock(original.filter(el => el.produto.nome.includes(name)))
        }

    }, [original, name])


    function clearFilter() {

        setName('')
        updateStock(original)
    }

    return (
        <article className={style.filter_stock_container}>

            <label>
                <p>Nome:</p>
                <input type="text" value={name} onChange={e => setName(e.target.value)}/>
            </label>

            <button onClick={clearFilter}>Limpar Filtro</button>

        </article>
    )
}