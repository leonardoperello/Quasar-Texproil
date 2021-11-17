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
          <q-toolbar-title> ASIGNAR TAREA A OPERARIO </q-toolbar-title>
          <q-btn
            padding="xs"
            color="red"
            text-color="white"
            label="Volver"
            to="/"
          />
        </q-toolbar>
      </q-header>
      <q-page padding class="full-height full-width">
        <div class="q-pa-md q-mt-md row justify-between">
          <div class="q-pa-xs q-mt-md row items-center q-gutter-*">
            <q-form class="row q-col-gutter-md">
              <div class="col-12">
                <p><b>Instrucciones para asignar una tarea a un operario</b></p>
                <p>
                  1. Seleccione un sector del listado y presione el botón
                  "CARGAR SECTOR"
                </p>
                <p>
                  2. Seleccione una Oti del listado y presione el botón "CARGAR
                  OTI"
                </p>
                <p>
                  3. Debe seleccionar una o varias tareas del listado y presione
                  el botón "CARGAR TAREA"
                </p>
                <p>
                  4. Por ultimo seleccione un operario y escriba una observación
                  y presione el botón "ASIGNAR TAREA"
                </p>
              </div>
            </q-form>
          </div>

          <div
            v-if="!cargarSector"
            class="q-pa-xs q-mt-md row items-center q-gutter-*"
          >
            <q-form class="row q-col-gutter-md">
              <div class="col-12">
                <h5>1. Seleccione un sector</h5>
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
                  color="positive"
                  label="Cargar Sector"
                  @click="getOtis(sector)"
                />
              </div>
            </q-form>
          </div>

          <div
            v-if="cargarSector && !cargarOti"
            class="q-pa-xs q-mt-md row items-center q-gutter-*"
          >
            <q-form class="row q-col-gutter-md">
              <div class="col-12">
                <h5>2. Seleccione una OTI</h5>
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
                  color="positive"
                  label="Cargar OTI"
                  @click="getTareas(oti)"
                />
              </div>
            </q-form>
          </div>
          <div
            v-if="cargarSector && cargarOti && !cargarTarea"
            class="q-pa-xs q-mt-md row items-center q-gutter-*"
          >
            <q-form class="row q-col-gutter-md">
              <div class="col-12">
                <h5>3. Seleccione las tarea</h5>
                <q-select
                  transition-show="scale"
                  transition-hide="scale"
                  clearable
                  filled
                  v-model="tareas"
                  multiple
                  :options="optionsTareas"
                  option-label="nombre"
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
                  color="positive"
                  label="Cargar Tarea"
                  @click="getOperarios(tareas)"
                />
              </div>
            </q-form>
          </div>
          <div
            v-if="cargarSector && cargarOti && cargarTarea"
            class="q-pa-xs q-mt-md row items-center q-gutter-*"
          >
            <q-form class="row q-col-gutter-md">
              <div class="col-12">
                <h5>4. Seleccione un operario</h5>
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
                <q-input
                  v-model="observacion"
                  label="Ingrese una observación"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                >
                </q-input>
                <q-btn
                  class="q-ml-sm q-mt-sm"
                  color="positive"
                  label="Asignar tarea"
                  @click="postAsignar(operario, observacion)"
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
      cargarTarea: false
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

    async getOtis(sector) {
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

    async getTareas(oti) {
      if (oti === '') {
        Notify.create({
          message: 'Debe seleccionar una OTI.',
          type: 'info',
          color: 'negative'
        })
      } else {
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

    async getOperarios(tareas) {
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
        this.$axios
          .post('http://localhost:8081/tarea/asignarTarea ', {
            idOti: this.oti.idOti,
            idOperario: this.operario._id,
            observacion: observacion,
            tareas: this.tareas
          })
          .then((res) => {
            this.asignar = res.data
            if (this.asignar) {
              Notify.create({
                message: 'La tarea ha sido asignada correctamente',
                type: 'positive',
                color: 'positive'
              }),
                (this.sector = ''),
                (this.oti = ''),
                (this.tareas = []),
                (this.operario = ''),
                (this.observacion = ''),
                (this.cargarSector = false),
                (this.cargarOti = false),
                (this.cargarTarea = false)
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
