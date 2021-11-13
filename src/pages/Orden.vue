<template>
  <div class="q-pa-md">
    <q-layout
      view="lHh lpr lFf"
      container
      style="height: 400px"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated>
        <q-toolbar>
          <q-btn
            padding="xs"
            color="white"
            text-color="black"
            label="Volver"
            to="/"
          />
          <q-toolbar-title> Cargar Orden de Producción </q-toolbar-title>
        </q-toolbar>
      </q-header>
      <q-page padding class="full-height full-width">
        <div class="q-pa-md row justify-between">
          <div class="q-pa-xs row items-center q-gutter-*">
            <q-form class="row q-col-gutter-md">
              <h5>Datos del cliente</h5>
              <div class="col-12 col-sm-6">
                <q-input v-model.number="cuit" label="Ingresar CUIT"> </q-input>

                <q-btn
                  class="q-ml-sm q-mt-sm"
                  color="primary"
                  label="Buscar"
                  @click="getClientes(cuit)"
                />

                <div class="q-pa-xs q-mt-md row items-center q-gutter-*">
                  <span v-if="cliente !== undefined">
                    Nombre: {{ cliente.nombre }}
                  </span>
                </div>
                <div class="q-pa-xs q-mt-md row items-center q-gutter-*">
                  <span v-if="cliente !== undefined">
                    Apellido: {{ cliente.apellido }}
                  </span>
                </div>
                <div class="q-pa-xs q-mt-md row items-center q-gutter-*">
                  <span v-if="cliente !== undefined">
                    Empresa: {{ cliente.nombreEmpresa }}
                  </span>
                </div>
              </div>
            </q-form>
          </div>

          <div class="q-pa-xs row items-center q-gutter-*">
            <q-form class="row q-col-gutter-md">
              <h5>Crear rosca</h5>
              <q-select
                v-model="tipoRosca"
                :options="options"
                option-label="nombre"
                label="Seleccione una rosca"
                lazy-rules
                emit-value
                map-options
              />
            </q-form>
          </div>
        </div>
      </q-page>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  data() {
    return {
      cuit: '',
      cliente: {},
      tipoRosca: '',
      options: []
    }
  },
  mounted() {
    this.getClientes(), this.getTipoRosca()
  },
  methods: {
    getClientes(cuit) {
      let parameter = cuit
      this.$axios
        .get('http://localhost:8081/cliente/' + parameter)
        .then((res) => {
          this.cliente = res.data
          console.log('clientes', res.data)
        })
        .catch((err) => {
          console.err
        })
    },
    getTipoRosca() {
      this.$axios
        .get('http://localhost:8081/rosca/tipoDeRosca')
        .then((res) => {
          this.options = res.data
          console.log('tipos de rosca', res.data)
        })
        .catch((err) => {
          console.err
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
