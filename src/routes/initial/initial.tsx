import { Link } from 'react-router-dom'

import styles from './initial.module.css'

import { LogoInariSys } from '../../assets/components/logo/logo'

export default function InitialPage(){

    return (<main className={styles.initial}>
            
            <LogoInariSys style={styles}/>

            <Link to={'/login'} className={styles.a}>Login</Link>
    </main>)
}