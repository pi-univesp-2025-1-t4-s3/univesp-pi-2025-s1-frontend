import logo from '../../logo inarisys_2.png'
import { LogoProps } from './logo.types';

export function LogoInariSys({ style }: LogoProps) {

    return (
        <div className={style.logo}>
            <img src={logo} alt="logo" />
        </div>
    )
}