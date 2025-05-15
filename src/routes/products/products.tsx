import { Link, useLoaderData } from "react-router";
import { useState } from "react";


import style from './products.module.css'

import { ProductsInterface } from "./products.type";

import { ProductsTable } from "./fragments/table_products";
import { ProductsFilter } from "./fragments/filter_products";
import { CreateProductsButton } from "./fragments/create_products";

export function Products() {

    const loader = useLoaderData();
    const [products, setProducts] = useState<ProductsInterface[]>([...loader])

    return (
        <main className={style.productspage}>

            <header>
                <Link to='/menu'>Voltar</Link>
                <h1>Produtos</h1>
            </header>

            <section className={style.utils_product_container}>
                <ProductsFilter original={loader} setProducts={setProducts}/>
                <CreateProductsButton refreshProducts={setProducts}/>
            </section>

            <ProductsTable products={products} refreshProducts={setProducts}/>

        </main>
    )
}