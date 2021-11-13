<template>
  <q-page-container class="justify-center full-height full-width text-center">
    <logo></logo>

    <div class="q-pa-md row justify-around">
      <div class="q-pa-xs row items-center q-gutter-*">
        <q-card class="my-card bg-primary text-white">
          <q-card-section>
            <div class="text-h6">Crear una nueva Orden</div>
          </q-card-section>

          <q-separator dark />

          <q-card-actions vertical align="center">
            <q-btn flat to="/orden" padding="xs">Ir</q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <div class="q-pa-xs row items-center q-gutter-*">
        <q-card class="my-card bg-primary text-white">
          <q-card-section>
            <div class="text-h6">Crear una nueva OTI</div>
          </q-card-section>

          <q-separator dark />

          <q-card-actions vertical align="center">
            <q-btn flat to="/oti" padding="xs">Ir</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="q-pa-xs row items-center q-gutter-*">
        <q-card class="my-card bg-primary text-white">
          <q-card-section>
            <div class="text-h6">Visualizar las OTIs</div>
          </q-card-section>

          <q-separator dark />

          <q-card-actions vertical align="center">
            <q-btn flat padding="xs">Ir</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <div class="q-pa-md row justify-around">
      <div class="q-pa-xs row items-center q-gutter-*">
        <q-card class="my-card bg-primary text-white">
          <q-card-section>
            <div class="text-h6">Asignar una nueva tarea</div>
          </q-card-section>

          <q-separator dark />

          <q-card-actions vertical align="center">
            <q-btn flat padding="xs">Ir</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="q-pa-xs row items-center q-gutter-*">
        <q-card class="my-card bg-primary text-white">
          <q-card-section>
            <div class="text-h6">Cambiar Estado tarea</div>
          </q-card-section>

          <q-separator dark />

          <q-card-actions vertical align="center">
            <q-btn flat padding="xs">Ir</q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div class="q-pa-xs row items-center q-gutter-*">
        <q-card class="my-card bg-primary text-white">
          <q-card-section>
            <div class="text-h6">Visualizar las tareas</div>
          </q-card-section>

          <q-separator dark />

          <q-card-actions vertical align="center">
            <q-btn flat padding="xs">Ir</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page-container>
</template>

<script>
import logo from './Logo.vue'
export default {
  components: {
    logo: logo
  }
}
</script>

<style lang="scss"></style>
>
