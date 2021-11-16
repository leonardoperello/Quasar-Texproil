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
          <q-toolbar-title> Asignar tareas a Operario </q-toolbar-title>
        </q-toolbar>
      </q-header>
      <q-page padding class="full-height full-width">
        <div class="q-pa-md q-mt-md row justify-between">
          <div class="q-pa-xs q-mt-md row items-center q-gutter-*">
            <q-form class="row q-col-gutter-md">
              <h5>Seleccionar Sector</h5>
              <div class="col-12 col-sm-6">
                <q-select
                  transition-show="scale"
                  transition-hide="scale"
                  filled
                  style="width: 250px"
                  v-model="sector"
                  :options="optionsSectores"
                  option-label="nombre"
                  label="Seleccione un sector"
                  lazy-rules
                  emit-value
                  map-options
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />
                <q-btn
                  class="q-ml-sm q-mt-sm"
                  color="primary"
                  label="Seleccionar"
                  @click="getOtis(sector)"
                />
              </div>
            </q-form>
          </div>
          <div
            v-if="sector !== ''"
            class="q-pa-xs q-mt-md row items-center q-gutter-*"
          >
            <q-form class="row q-col-gutter-md">
              <h5>Seleccionar OTI</h5>
              <div class="col-12 col-sm-6">
                <q-select
                  transition-show="scale"
                  transition-hide="scale"
                  filled
                  style="width: 250px"
                  v-model="oti"
                  :options="optionsOtis"
                  option-label="idOti"
                  label="Seleccione una OTI"
                  lazy-rules
                  emit-value
                  map-options
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />
                <q-btn
                  class="q-ml-sm q-mt-sm"
                  color="primary"
                  label="Seleccionar"
                  @click="getTareas(oti)"
                />
              </div>
            </q-form>
          </div>
          <div
            v-if="sector !== '' && oti !== ''"
            class="q-pa-xs q-mt-md row items-center q-gutter-*"
          >
            <q-form class="row q-col-gutter-md">
              <h5>Seleccionar tareas</h5>
              <div class="col-12 col-sm-6">
                <q-select
                  transition-show="scale"
                  transition-hide="scale"
                  filled
                  v-model="tareas"
                  multiple
                  :options="optionsTareas"
                  counter
                  hint="With counter"
                  style="width: 250px"
                  lazy-rules
                  emit-value
                  map-options
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />
                <q-btn
                  class="q-ml-sm q-mt-sm"
                  color="primary"
                  label="Seleccionar"
                />
              </div>
            </q-form>
          </div>
        </div>
      </q-page>
    </q-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      optionsSectores: [],
      optionsOtis: [],
      optionsTareas: [],
      sector: '',
      oti: '',
      tareas: []
    }
  },
  mounted() {
    this.getSector()
  },
  methods: {
    getSector() {
      this.$axios
        .get('http://localhost:8081/sector/')
        .then((res) => {
          this.optionsSectores = res.data
          console.log('sectores', res.data)
        })
        .catch((err) => {
          console.err
        })
    },
    async getOtis(sector) {
      const parameter = sector.nombre
      const salida = await this.$axios.get(
        'http://localhost:8081/tarea/obtenerOtis/' + parameter
      )
      this.optionsOtis = salida.data
      console.log('otis', salida)
    },
    async getTareas(oti) {
      let parameter = oti.idOti
      const salida = await this.$axios.get(
        'http://localhost:8081/tarea/obtenerTareas/' + parameter
      )
      this.optionsTareas = salida.data
      console.log('otis', salida)
    }
  }
}
</script>
