import { forwardRef } from "react"

type Props = {

    title?: string,
    message: string,
    style: any
}

export type MessageContentInterface = {

    title?: string,
    message: string,
}

export const Message = forwardRef<HTMLElement, Props>(

    ({title, message, style}, ref) => {

        return (
    
            <div className={style.black_background_image}>
    
                <article ref={ref}>
    
                {
                    title && (
                        <h1>{title}</h1>
                    )
                }
    
                <p>{message}</p>
    
                </article>
    
            </div>
        )
    }

)