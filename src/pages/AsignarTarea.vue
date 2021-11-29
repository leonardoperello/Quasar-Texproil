<template>
  <div class="q-pa-md q-mt-sm">
    <q-toolbar class="bg-teal-9 text-white shadow-2">
      <q-toolbar-title>ASIGNAR TAREA A OPERARIO</q-toolbar-title>
      <div class="row justify-end">
        <q-btn
          padding="xs"
          color="red"
          text-color="white"
          label="Volver"
          to="/menu"
        />
      </div>
    </q-toolbar>

    <q-stepper v-model="step" vertical color="primary" animated>
      <q-step
        :name="1"
        title="Seleccione un sector"
        icon="settings"
        :done="step > 1"
      >
        <q-form class="row q-col-gutter-md">
          <div class="col-12">
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
          </div>
        </q-form>

        <q-stepper-navigation>
          <q-btn
            v-if="sector"
            @click="getOperarios(sector, 2)"
            color="primary"
            label="Siguiente"
          />
          <q-btn v-if="!sector" disable color="primary" label="Siguiente" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Seleccione un operario"
        icon="create_new_folder"
        :done="step > 2"
      >
        <q-form class="row q-col-gutter-md">
          <div class="col-2">
            <q-select
              transition-show="scale"
              transition-hide="scale"
              filled
              style="width: 250px"
              v-model="operario"
              :options="optionsOperarios"
              option-label="nombre"
              label="Seleccione un Operario"
              lazy-rules
              emit-value
              map-options
              :rules="[(val) => !!val || 'Campo obligatorio']"
            />
          </div>
        </q-form>
        <q-stepper-navigation>
          <q-btn
            v-if="operario"
            @click="getOtis(sector, 3)"
            color="primary"
            label="siguiente"
          />
          <q-btn v-if="!operario" disable color="primary" label="Siguiente" />
          <q-btn
            @click="step = 1"
            flat
            color="primary"
            label="Atras"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Seleccione una OTI"
        icon="create_new_folder"
        :done="step > 3"
      >
        <q-form class="row q-col-gutter-md">
          <div class="col-12">
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
          </div>
        </q-form>
        <q-stepper-navigation>
          <q-btn
            v-if="oti"
            @click="getTareas(oti, 4)"
            color="primary"
            label="Siguiente"
          />
          <q-btn v-if="!oti" disable color="primary" label="Siguiente" />
          <q-btn
            @click="step = 2"
            flat
            color="primary"
            label="Atras"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="Seleccione las tareas"
        icon="create_new_folder"
        :done="step > 4"
      >
        <q-form class="row q-col-gutter-md">
          <div class="col-12">
            <q-select
              filled
              v-model="tareas"
              multiple
              :options="optionsTareas"
              option-label="nombre"
              label="Multiple"
              style="width: 250px"
              :rules="[(val) => !!val || 'Campo obligatorio']"
            />
            <q-input v-model="observacion" label="Ingrese una observación">
            </q-input>
          </div>
        </q-form>
        <q-stepper-navigation>
          <q-btn
            v-if="tareas.length > 0 && observacion"
            @click="postAsignar(observacion)"
            color="positive"
            label="Asignar tarea"
          />
          <q-btn
            v-if="tareas.length === 0 || !observacion"
            disable
            color="positive"
            label="Asignar tarea"
          />
          <q-btn
            @click="step = 3"
            flat
            color="primary"
            label="Atras"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import { Notify } from 'quasar'
export default {
  data() {
    return {
      optionsSectores: [],
      optionsOtis: [],
      optionsTareas: [],
      optionsOperarios: [],
      sector: '',
      oti: '',
      operario: '',
      asignar: '',
      tareas: [],
      observacion: '',
      step: 1
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
        })
        .catch((err) => {
          console.err
        })
    },

    async getOperarios(sector, num) {
      this.step = num
      const parameter = sector.nombre
      const salida = await this.$axios.get(
        'http://localhost:8081/operario/operarioSector/' + parameter
      )
      this.optionsOperarios = salida.data
    },

    async getOtis(sector, num) {
      this.step = num
      const parameter = sector.nombre
      const salida = await this.$axios.get(
        'http://localhost:8081/tarea/obtenerOtis/' + parameter
      )
      this.optionsOtis = salida.data
    },

    async getTareas(oti, num) {
      this.step = num
      let parameter = oti.idOti
      const salida = await this.$axios.get(
        'http://localhost:8081/tarea/obtenerTareas/' + parameter
      )
      this.optionsTareas = salida.data
    },

    postAsignar(observacion) {
      this.$axios
        .post('http://localhost:8081/tarea/asignarTarea ', {
          idOti: this.oti.idOti,
          idOperario: this.operario._id,
          observacion: this.observacion,
          tareas: this.tareas
        })
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            this.step = 1
            Notify.create({
              message: 'La tarea ha sido asignada correctamente',
              type: 'positive',
              color: 'positive'
            }),
              (this.step = 1),
              (this.sector = ''),
              (this.oti = ''),
              (this.tareas = []),
              (this.operario = ''),
              (this.observacion = '')
          } else {
            Notify.create({
              message: 'Error al asignar tarea',
              type: 'info',
              color: 'negative'
            })
          }
        })
        .catch((err) => {
          console.err
        })
    }
  }
}
</script>
