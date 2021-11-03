<template>
  <q-page-container class="justify-center full-height full-width text-center">
    <logo></logo>

    <div class="q-pa-md justify-center full-height full-width text-center">
      <div class="row">
        <div class="col q-pa-md q-gutter-sm">
          <q-btn
            padding="xs"
            icon="eco"
            color="white"
            text-color="black"
            label="Cargar orden de producción"
            to="/orden"
          />
        </div>
        <div class="col q-pa-md q-gutter-sm">
          <q-btn
            padding="xs"
            icon="eco"
            color="white"
            text-color="black"
            label="Cargar OTI"
            to="/orden"
          />
        </div>
        <div class="col q-pa-md q-gutter-sm">
          <q-btn
            padding="xs"
            icon="eco"
            color="white"
            text-color="black"
            label="Asignar Tarea"
            to="/orden"
          />
        </div>
      </div>

      <div class="row">
        <div class="col q-pa-md q-gutter-sm">
          <q-btn
            padding="xs"
            icon="eco"
            color="white"
            text-color="black"
            label="Cambiar Estado"
            to="/orden"
          />
        </div>
        <div class="col q-pa-md q-gutter-sm">
          <q-btn
            padding="xs"
            icon="eco"
            color="white"
            text-color="black"
            label="Visualizar OTIs"
            to="/orden"
          />
        </div>
        <div class="col q-pa-md q-gutter-sm">
          <q-btn
            padding="xs"
            icon="eco"
            color="white"
            text-color="black"
            label="Visualizar tareas"
            to="/orden"
          />
        </div>
      </div>
    </div>
  </q-page-container>
</template>

<style lang="sass" scoped>
.row > div
  padding: 50px 15px
  background: $primary
  border: 5px solid white
  alignment: middle
.row + .row
  margin-top: 5rem
</style>

<script>
import logo from './Logo.vue'

export default {
  components: {
    logo: logo
  }
}
</script>

<style lang="scss">
row {
  border: 5px solid black;
}
col {
  border: 5px solid black;
  padding: 5px;
}
</style>
>
