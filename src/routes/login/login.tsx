import { Form, useActionData } from 'react-router'

//css
import style from './login.module.css'
//logo
import { useEffect, useRef, useState } from 'react'
import { LogoInariSys } from '../../assets/components/logo/logo'
import { Message } from '../../assets/components/message/message'
import { ClickOutside } from '../../assets/components/clickoutside/clickoutside'

export default function Login(){

    const actiondata = useActionData()
    const [login_message, setMessage] = useState(actiondata?.message || null)

    const refMessage = useRef<HTMLElement>(null)

    useEffect(() => {

        if(actiondata?.message) {
            setMessage(actiondata?.message)
        }

    }, [ actiondata?.id ])


    ClickOutside({popupState: login_message, closeAction: () => setMessage(null), ref: refMessage})

    return (<main className={style.loginpage}>
            
            <LogoInariSys style={style}/>

            <section>

                {
                    login_message && <Message message={actiondata.message} style={style} ref={refMessage}/>
                }

                <Form method='POST'>
                    <label htmlFor="email_input">
                        <p>Email:</p>
                        <input type="text" name="email" id="email_input" required alt='formulario de login, campo, email'/>
                    </label>
                    <label htmlFor="senha_input">
                    <p>Password:</p>
                    <input type="password" name="senha" id="senha_input" required alt='formulario de login, campo, senha'/>
                    </label>

                    <input type="submit" value="Login" alt='formulario de login, botão, autenticar'/>
                </Form>
            </section>
    </main>)
}