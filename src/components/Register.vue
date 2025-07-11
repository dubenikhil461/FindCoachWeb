<template>
    <QPage class="flex items-center justify-center min-h-screen"
        style="background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'); background-size: cover; background-position: center;">
        <QCard class="w-full max-w-md p-6 bg-green-500 shadow-xl rounded-xl">
            <QCardSection>
                <FormKit type="form" @submit="register" :actions="false" :classes="{
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
                    <FormKit type="select" :options="['coach', 'student']" label="SELECT YOUR PROFESSIONAL"
                        v-model="formObj.role" :classes="{
                            outer: 'w-full bg-transparent',
                            input: 'bg-transparent border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition',
                        }" required />
                    <QBtn type="submit" outline color="green" label="Register" />
                </FormKit>
            </QCardSection>
            <!-- OTP Modal -->
            <div v-if="sendotp" key="otp-modal"
                class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <QCardSection>
                    <FormKit type="form" @submit="verifyotp" :actions="false" :classes="{
                        form: 'flex flex-col gap-4',
                    }" required>
                        <FormKit type="text" label="Enter OTP" v-model="otp" required />
                        <QBtn type="submit" outline color="green" label="Verify OTP" />
                    </FormKit>
                </QCardSection>
            </div>
        </QCard>
    </QPage>
</template>


<script setup>
import { ref } from 'vue'
import Ax from '../helper/Axios.js'
const formObj = ref({
    username: '',
    email: '',
    password: '',
    role: '',
})
const sendotp = ref(false)
const otp = ref('')
async function register() {
    try {
        const resp = await Ax.post('/user/register', formObj.value)
        if (resp.data && resp.data.success) {
            console.log("OTP sent successfully")
            sendotp.value = true
        }
    } catch (error) {
        console.log(error)
    }
}

async function verifyotp() {
    try {
        const resp = await Ax.post('/user/verifyotp', {
            otp: otp.value,
            email: formObj.value.email
        })
        if (resp.data && resp.data.success) {
            console.log("OTP verified successfully")
            sendotp.value = false
        }
    } catch (error) {
        console.log(error)
    }
}

</script>
