<template>
    <QPage class="flex items-center justify-center min-h-screen q-pa-md">
        <QCard class="my-card" bordered>
            <QCardSection>
                <div class="flex flex-col items-center justify-center">
                    <FormKit type="form" submit-label="Register">
                        <FormKit type="text" label="username" placeholder="asus123" v-model="formObj.username"
                            required />
                        <FormKit type="email" label="email" v-model="formObj.email" required />
                        <FormKit type="password" label="password" v-model="formObj.password" required />
                        <QBtn @click="sendOtp" size="9px">Send OTP</QBtn>
                        <FormKit type="select" :options="['coach', 'student']" label="role" v-model="formObj.role"
                            required />
                        <FormKit type="text" label="otp" required />
                    </FormKit>
                </div>
            </QCardSection>
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

async function sendOtp() {
    try {
        const resp = await Ax.post('/user/send-otp', formObj.value)
        if (resp.data && resp.data.success) {
            console.log("OTP sent successfully")
        }
    } catch (error) {
        console.log(error)
    }
}

</script>
