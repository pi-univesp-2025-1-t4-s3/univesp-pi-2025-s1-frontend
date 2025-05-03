import { Link } from "react-router";
import style from './progress.module.css'

export async function Progress() { 

    return (
        <main className={style.main_futurepage}>

            <header>
                <Link to='/menu'>Voltar</Link>
            </header>

            <section>

                <p>Em progresso...</p>

            </section>

        </main>
    )
}