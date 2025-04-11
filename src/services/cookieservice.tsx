import Cookie from 'js-cookie'

class CookieBase {

    async getCookie(key:string) {

        return Cookie.get(key)
    }

    async setCookie(key: string , value: string, time: number = 60 * 1000 * 5 ) {

        try {
            
            Cookie.set(key, value, { expires:   new Date(   new Date().getTime() + time  )  } )

            return true
        } catch {
            return false
        }
    }

    async delCookie(key: string) {

        try {

            Cookie.remove(key)

            return true
        } catch (error) {
            
            return false
        }
    }
}


class CookieManager extends CookieBase{

    #key_default
    #time 

    constructor () {

        super()
        this.#key_default = 'user'
        this.#time = 15 * 60 * 1000
    }

    async get() {
        return this.getCookie(this.#key_default)
    }

    async set(value: string) {
        return await this.setCookie(this.#key_default, value, this.#time) ? true : false
    }

    async delete() {
        return await this.delCookie(this.#key_default)? true : false
    }
}

export { CookieManager }