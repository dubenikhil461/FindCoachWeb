import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        IsLoggedIn: false,
        IsLoggedOut: false,
    }),
    actions: {
        login(userdata) {
            this.IsLoggedIn = true
            this.IsLoggedOut = false
            this.user = userdata
            return this.user
        },
        logout() {
            this.IsLoggedIn = false
            this.IsLoggedOut = true
            this.user = null
            return this.user
        }
    }
})