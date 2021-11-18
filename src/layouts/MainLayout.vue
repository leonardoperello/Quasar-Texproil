<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      reveal
      elevated
      class="textHeader bg-secondary text-white"
      :class="$q.dark.isActive ? 'header_dark' : 'header_normal'"
    >
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <logo></logo>
          </q-avatar>
          Texproil
        </q-toolbar-title>

        <q-btn
          class="q-mr-xs"
          flat
          round
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'"
        />
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-dark text-white text-right">
      <q-toolbar>
        <q-space></q-space>
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
