<template>
    <QPage class="flex items-center justify-center min-h-screen"
        style="background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'); background-size: cover; background-position: center;">
        <QCard class="w-full max-w-md p-6 bg-green-500 shadow-xl rounded-xl">
            <QCardSection>
                <FormKit type="form" @submit="register" :actions="false"
                    :classes="{ form: 'bg-transparent flex flex-col gap-4' }">
                    <FormKit type="text" label="USERNAME" v-model="formObj.username" :classes="{
                        outer: 'w-full bg-transparent',
                        input: 'border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                    }" required />
                    <FormKit type="email" label="EMAIL" v-model="formObj.email" :classes="{
                        outer: 'w-full bg-transparent',
                        input: 'bg-transparent border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                    }" required />
                    <FormKit type="password" label="PASSWORD" v-model="formObj.password" :classes="{
                        outer: 'w-full bg-transparent',
                        input: 'bg-transparent border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                    }" required />
                    <FormKit type="select" :options="['coach', 'student']" label="SELECT YOUR PROFESSIONAL"
                        v-model="formObj.role" :classes="{
                            outer: 'w-full bg-transparent',
                            input: 'bg-transparent border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                        }" required />
                    <QBtn type="submit" outline color="green" label="Register" />
                </FormKit>
            </QCardSection>

            <!-- OTP Modal -->
            <QDialog v-model="sendotp" persistent>
                <QCard class="w-full max-w-sm p-6 bg-white shadow-xl rounded-xl">
                    <QCardSection>
                        {{ otp }}
                        <FormKit type="form" @submit="handleVerifyOtp" :actions="false">
                            <FormKit type="text" label="Enter OTP" v-model="otp" :classes="{
                                outer: 'w-full bg-transparent',
                                input: 'border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
                            }" required />
                            <QBtn type="submit" outline color="green" label="Verify OTP" />
                        </FormKit>
                    </QCardSection>
                </QCard>
            </QDialog>
        </QCard>
    </QPage>
</template>

<script setup>
import { ref } from 'vue'
import Ax from '../helper/Axios.js'
import { useRouter } from 'vue-router'
const router = useRouter()
const formObj = ref({
    username: '',
    email: '',
    password: '',
    role: '',
})

const sendotp = ref(false)
const otp = ref('')
const userEmail = ref('') // store email globally to reuse for verify

async function register() {
    try {
        const resp = await Ax.post('/user/register', formObj.value)
        if (resp.status === 200) {
            console.log("OTP sent successfully")
            userEmail.value = formObj.value.email // Save email for later
            sendotp.value = true // Open OTP modal
        }
    } catch (error) {
        console.log(error.response?.data?.message)
    }
}

async function handleVerifyOtp() {
    try {
        const resp = await Ax.post('/user/verify-otp', {
            otp: otp.value,
            email: userEmail.value
        })
        if (resp.status === 200) {
            console.log("OTP verified successfully")
            sendotp.value = false // Close modal
            otp.value = '' // Reset OTP input
            router.push('/login')
        }
    } catch (error) {
        console.log(error.response?.data?.message || "An error occurred during OTP verification.")
    }
}
</script>
