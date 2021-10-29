<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Mariano, Walter, Leo
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
        <div class="golden-green q-ml-md rounded-borders">
           <q-img
            alt="Green logo"
            src="assets/golden-tipo1.jpg"
            style="width:35px;"
            >
            </q-img>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>

        <!-- <q-separator spaced /> -->

        <q-item-label header>Links</q-item-label>

        <q-item clickable tag="a" target="_blank" href="https://github.com/leonardoperello/Quasar-Texproil">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/grupo3</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />

      <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
            <q-btn fab icon="keyboard_arrow_up" color="primary" />
      </q-page-scroller>

    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL, useQuasar  } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  },

  setup () {
    const $q = useQuasar()

    // calling here; equivalent to when component is created
    $q.dark.set(false)
  }
}
</script>

<style>
</style>

