import { useEffect, useRef, useState } from "react"
import { ProductsInterface } from "../products.type"

import style from './css/filter_products.module.css'

type Props = {

    original: ProductsInterface[],
    setProducts: React.Dispatch<React.SetStateAction<ProductsInterface[]>>,
}

type FilterInterface = {

    nome: string,
    price: string,
    pricetype: string
}

export function ProductsFilter({original, setProducts}: Props) {

    const defaultfilters = {nome: '', price: '', pricetype: 'all'}
    const [filters, setFilters] = useState<FilterInterface>(defaultfilters)

    const priceFieldRef = useRef<HTMLInputElement>(null)
    
    useEffect(() => {


        let tmp = original

        switch (filters.pricetype) {

            case 'equal':
                tmp = tmp.filter(el => {
                    const price = Number(filters.price)
                    return Number.isFinite(price) && el.preco == price 
                })
            break;

            case 'lower':
                tmp = tmp.filter(el => {
                    const price = Number(filters.price)
                    return Number.isFinite(price) && el.preco <= price 
                })
            break;

            case 'greater':
                tmp = tmp.filter(el => {
                    const price = Number(filters.price)
                    return Number.isFinite(price) && el.preco >= price 
                })
            break;
        }

        if(filters.nome){
            tmp = tmp.filter(el => el.nome.toLowerCase().includes(filters.nome.toLowerCase()))
        }

        setProducts(tmp)
        
    }, [original, filters])

    function clearFilters() {

        setProducts(original)  
        setFilters(defaultfilters)

        if(priceFieldRef.current) {

            priceFieldRef.current.value = ""
        }
    
    }


    return (
        <div className={style.filter_container_productpage}>

            <fieldset>
                <p>Nome:</p>
                <input type="text" onChange={ e => setFilters({...filters, nome: e.target.value})} value={filters.nome} />
            </fieldset>

            <fieldset>

                <p>Preço:</p>

                <select onChange={e => setFilters({...filters, pricetype: e.target.value})} value={filters.pricetype}>
                    <option value="all">tudo</option>
                    <option value="equal">igual a</option>
                    <option value="lower">menor que</option>
                    <option value="greater">maior que</option>

                </select>

                <input type="number" step={0.01} ref={priceFieldRef} onChange={ e => setFilters({...filters, price: e.target.value})} value={filters.price}/>

            </fieldset>

            <fieldset fieldset-has-button="true">

                <button onClick={clearFilters}>Limpar filtros</button>

            </fieldset>

        </div>
    )
}