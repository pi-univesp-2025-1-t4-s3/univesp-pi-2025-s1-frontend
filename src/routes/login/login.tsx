import { Form, useActionData } from 'react-router'

//css
import style from './login.module.css'
//logo
import { useEffect, useRef, useState } from 'react'
import { LogoInariSys } from '../../assets/components/logo/logo'

export default function Login(){

    const actiondata = useActionData()
    const [login_message, setMessage] = useState(actiondata?.message || null)

    const refMessage = useRef<HTMLParagraphElement>(null)

    useEffect(() => {

        if(actiondata?.message) {
            setMessage(actiondata?.message)
            refMessage.current?.focus()
            useActionData
        }

    }, [ actiondata?.id ])

    function message_box_click() {
        setMessage(null)
    }

    return (<main className={style.main}>
            
            <LogoInariSys style={style}/>

            <section>

                {
                    login_message && (

                        <div className={style.message_popup} onClick={message_box_click}>

                            <p ref={refMessage} tabIndex={-1}  aria-live="assertive">
                                Message: {login_message}
                            </p>
                        </div>
                    )
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