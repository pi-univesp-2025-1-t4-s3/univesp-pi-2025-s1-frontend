import { RefObject, useEffect } from "react"

type Props = {

    popupState: boolean,
    ref: RefObject<any>,
    closeAction: () => void
}

export function ClickOutside({popupState, closeAction, ref}: Props) {

useEffect(() => {

    function handleOutsideClick(e: Event) {

        if(ref.current && !ref.current.contains(e.target as Node)){

            closeAction()
        }

    }

    if(popupState){
        document.addEventListener('mousedown', handleOutsideClick)
    }

    return () => {

        document.removeEventListener('mousedown', handleOutsideClick)
    }

}, [popupState])
}