import { Link, useLoaderData } from "react-router";
import { LogoInariSys } from "../../assets/components/logo/logo";
import style from './perfil.module.css'

export function Perfil() {

    const data = useLoaderData() as any;

    return (
        <main className={style.main_perfilpage}>

            <header>

                <Link to='/menu'>Voltar</Link>
                <LogoInariSys style={style}/>
            </header>

            <section>

                { data && <p>Olá {data}</p>}

            </section>

        </main>
    )
}