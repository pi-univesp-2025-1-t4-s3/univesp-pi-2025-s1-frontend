import logo from '../../logo inarisys_2.png'

export function LogoInariSys({ style }: { style : any}) {

    return (
        <div className={style.logo}>
            <img src={logo} alt="logo" />
        </div>
    )
}