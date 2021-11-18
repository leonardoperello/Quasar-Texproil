<template>
  <div class="q-pa-md q-mt-sm">
    <q-toolbar class="bg-teal-9 text-white shadow-2">
      <q-toolbar-title>Asignar Tareas</q-toolbar-title>
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
        title="Seleccione un sectors"
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
          <q-btn @click="getOtis(sector, 2)" color="primary" label="Continue" />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Seleccione una OTI"
        icon="create_new_folder"
        :done="step > 2"
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
          <q-btn @click="getTareas(oti, 3)" color="primary" label="Continue" />
          <q-btn
            flat
            @click="step = 1"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name="3"
        title="Seleccione las tareas"
        icon="create_new_folder"
        :done="step > 3"
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
          </div>
        </q-form>
        <q-stepper-navigation>
          <q-btn
            @click="getOperarios(tareas, 4)"
            color="primary"
            label="Continue"
          />
          <q-btn
            flat
            @click="step = 2"
            color="primary"
            label="Back"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name="4"
        title="Seleccione un operario"
        icon="create_new_folder"
        :done="step > 4"
      >
        <q-form class="row q-col-gutter-md">
          <div class="col-12">
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
            <q-input v-model="observacion" label="Ingrese una observación">
            </q-input>
          </div>
        </q-form>
        <q-stepper-navigation>
          <q-btn
            @click="postAsignar(operario, observacion)"
            color="primary"
            label="crear"
          />
          <q-btn
            flat
            @click="step = 3"
            color="primary"
            label="Back"
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
      cargarSector: false,
      cargarOti: false,
      cargarTarea: false,
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

    async getOtis(sector, num) {
      this.step = num
      console.log('hola')
      if (sector === '') {
        Notify.create({
          message: 'Debe seleccionar un sector.',
          type: 'info',
          color: 'negative'
        })
      } else {
        const parameter = sector.nombre
        const salida = await this.$axios.get(
          'http://localhost:8081/tarea/obtenerOtis/' + parameter
        )
        this.optionsOtis = salida.data
        if (this.optionsOtis) {
          Notify.create({
            message: 'El sector se ha cargado con exito',
            type: 'positive',
            color: 'positive'
          })
          this.cargarSector = true
        } else {
          Notify.create({
            message: 'Error al cargar el sector',
            type: 'info',
            color: 'negative'
          })
        }
      }
    },

    async getTareas(oti, num) {
      this.step = num
      if (oti === '') {
        Notify.create({
          message: 'Debe seleccionar una OTI.',
          type: 'info',
          color: 'negative'
        })
      } else {
        console.log(oti.idOti)
        let parameter = oti.idOti
        const salida = await this.$axios.get(
          'http://localhost:8081/tarea/obtenerTareas/' + parameter
        )
        this.optionsTareas = salida.data
        if (this.optionsTareas) {
          Notify.create({
            message: 'La OTI se ha cargado con exito',
            type: 'positive',
            color: 'positive'
          })
          this.cargarOti = true
        } else {
          Notify.create({
            message: 'Error al cargar la OTI',
            type: 'info',
            color: 'negative'
          })
        }
      }
    },

    async getOperarios(tareas, num) {
      this.step = num
      if (tareas.length === 0) {
        Notify.create({
          message: 'Debe seleccionar al menos una tarea',
          type: 'info',
          color: 'negative'
        })
      } else {
        const salida = await this.$axios.get('http://localhost:8081/operario/')
        this.optionsOperarios = salida.data
        if (this.optionsOperarios) {
          Notify.create({
            message: 'Las tareas se han cargado con éxito',
            type: 'positive',
            color: 'positive'
          })
          this.cargarTarea = true
        } else {
          Notify.create({
            message: 'Error al cargar las tareas',
            type: 'info',
            color: 'negative'
          })
        }
      }
    },

    postAsignar(operario, observacion) {
      if (operario === '' && observacion === '') {
        Notify.create({
          message: 'Faltan completar algunos campos obligatorios',
          type: 'info',
          color: 'negative'
        })
      } else {
        console.log(this.tareas)
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
              })
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
}
</script>
