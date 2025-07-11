<template>
    <QPage class="flex items-center justify-center min-h-screen">
        <QCard class="w-full max-w-md p-6 bg-green-500 shadow-xl rounded-xl">
            <QCardSection>
                <FormKit type="form" @submit="login" :actions="false" :classes="{
                    form: 'bg-transparent flex flex-col gap-4',
                }">
                    <FormKit type="text" label="USERNAME" v-model="formObj.username" :classes="{
                        outer: 'w-full bg-transparent',
                        input: ' border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition',
                    }" required />
                    <FormKit type="email" label="EMAIL" v-model="formObj.email" :classes="{
                        outer: 'w-full bg-transparent',
                        input: 'bg-transparent border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition',
                    }" required />
                    <FormKit type="password" label="PASSWORD" v-model="formObj.password" :classes="{
                        outer: 'w-full bg-transparent',
                        input: 'bg-transparent border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition',
                    }" required />
                    <QBtn type="submit" outline color="green" label="Login" />
                </FormKit>
            </QCardSection>
        </QCard>
    </QPage>
</template>


<script setup>
import { ref } from 'vue'
import Ax from '../helper/Axios.js'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
// const userstore = useUserStore()
const router = useRouter()
const formObj = ref({
    username: '',
    email: '',
    password: '',
})
async function login() {
    try {
        const resp = await Ax.post('/user/login', formObj.value)
        if (resp.status === 200) {
            // userstore.login(resp.data.user)
            router.push({ name: 'register' })
        }
    } catch (error) {
        console.log(error)
    }
}

</script>
