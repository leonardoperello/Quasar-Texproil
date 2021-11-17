<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-secondary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <logo></logo>
          </q-avatar>
          Texproil
        </q-toolbar-title>
        <q-toolbar-title>
          {{ user ? user.displayName : '' }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-dark text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>Texproil</div>
        </q-toolbar-title>
        <div>Copyright 2017 © texproil / Diseñado por ig innovations</div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import logo from '../pages/Logo2.vue'
import { getAuth } from 'firebase/auth'

export default {
  components: {
    logo: logo
  },
  data() {
    return {
      user: null
    }
  },

  methods: {
    async datos() {}
  },
  created() {
    const auth = getAuth()
    this.user = auth.currentUser
    console.log(this.user)
  }
}
</script>

<style></style>
