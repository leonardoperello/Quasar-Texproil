<template>
  <q-page-container class="justify-center full-height full-width text-center">
    <logo></logo>

    <div class="q-pa-md row justify-around">
      <div class="q-pa-xs row items-center q-gutter-*">
        <q-card class="my-card bg-primary text-white">
          <q-separator dark />

          <q-card-actions vertical align="center">
            <q-btn flat to="/orden" padding="md">CREAR ORDEN</q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <div class="q-pa-xs row items-center q-gutter-*">
        <q-card class="my-card bg-primary text-white">
          <q-separator dark />

          <q-card-actions vertical align="center">
            <q-btn flat to="/oti" padding="md">CREAR OTI</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="q-pa-xs row items-center q-gutter-*">
        <q-card class="my-card bg-primary text-white">
          <q-separator dark />

          <q-card-actions vertical align="center">
            <q-btn flat padding="md">VISUALIZAR OTIS</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <div class="q-pa-md row justify-around">
      <div class="q-pa-xs row items-center q-gutter-*">
        <q-card class="my-card bg-primary text-white">
          <q-separator dark />

          <q-card-actions vertical align="center">
            <q-btn flat padding="md" to="/asignar">ASIGNAR TAREA</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="q-pa-xs row items-center q-gutter-*">
        <q-card class="my-card bg-primary text-white">
          <q-separator dark />

          <q-card-actions vertical align="center">
            <q-btn flat padding="md">CAMBIAR ESTADO DE TAREA</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="q-pa-xs row items-center q-gutter-*">
        <q-card class="my-card bg-primary text-white">
          <q-separator dark />

          <q-card-actions vertical align="center">
            <q-btn flat padding="md">VISUALIZAR TAREAS</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page-container>
</template>

<script>
import logo from './Logo.vue'
export default {
  components: { logo }
}
</script>

<style lang="scss"></style>
>
