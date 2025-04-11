import { Link } from 'react-router'

//css
import style from './menu.module.css'
//logo

import { LogoInariSys } from '../../assets/components/logo/logo'

export default function Menu(){

    return (<main className={style.main}>
            
            <header>

                <Link to={'/logout'}>Sair</Link>

                <LogoInariSys style={style}/>

                <Link to={'/perfil'}>Perfil</Link>
            </header>

            <section className={style.menu_body}>

                <Link to={'/products'}>Produtos</Link>
                <Link to={'/stock'}>Estoque</Link>
                <Link to={'/sales'}>Pedidos</Link>

            </section>
    </main>)
}