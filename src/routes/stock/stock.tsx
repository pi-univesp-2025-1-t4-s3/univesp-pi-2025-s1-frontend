import { useState } from "react";
import { Link, useLoaderData } from "react-router";


import style from './stock.module.css'
import { StockInterface, StockTable } from "./fragments/stock_table";
import { FilterStock } from "./fragments/filter_stock";

export function Stock() {

    const loader = useLoaderData<StockInterface[]>();

    const [originalStock, setOriginalStock] = useState([...loader])            //base para modificação de quantidades
    const [filteredstock, setStock] = useState<StockInterface[]>([...loader])  //filtros


    return (
        <main className={style.stockpage}>

            <header>
                <Link to='/menu'>Voltar</Link>
                <h1>Estoque</h1>
            </header>

            <section className={style.utils_stock_container}>

                <FilterStock original={originalStock} updateStock={setStock} />
            </section>

            <StockTable stock={filteredstock} updateStock={setOriginalStock} />

        </main>
    )
}