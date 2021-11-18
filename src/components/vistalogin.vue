<template>
  <div align="center">
    <img src="https://texproil.com.ar/images/logo/logo.png" />
  </div>
  <div align="center">
    <q-btn class="q-mt-xl" size="xl" color="primary" @click="registro">
      login
    </q-btn>
  </div>
</template>

<script>
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import router from '../router'
const provider = new GoogleAuthProvider()
const auth = getAuth()
export default {
  data() {
    const registro = async () => {
      try {
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            // The signed-in user info.
            const user = result.user

            this.$axios
              .get('http://localhost:8081/empleado/usuario', {
                params: {
                  usuario: user.email
                }
              })
              .then((res) => {
                const user = res.data
                if (user?.funcion === 'supervisor') {
                  this.$router.push('menu')
                }
                if (user?.funcion === 'operario') {
                  this.$router.push('menuOperario')
                }
              })
              .catch((err) => {
                console.err
              })
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code
            const errorMessage = error.message
            // The email of the user's account used.
            const email = error.email
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error)
            // ...
          })
      } catch (error) {
        console.log(error)
      }
    }

    return { registro }
  }
}
</script>
