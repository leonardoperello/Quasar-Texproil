<template>
  <div class="q-pa-md">
    <q-layout
      view="lHh lpr lFf"
      container
      style="height: 400px"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated>
        <q-toolbar class="bg-teal-9 text-white shadow-2">
          <q-toolbar-title> CARGAR ORDEN DE PRODUCCIÓN </q-toolbar-title>
          <q-btn
            padding="xs"
            color="red"
            text-color="white"
            label="Volver"
            to="/menu"
          />
        </q-toolbar>
      </q-header>
      <q-page padding class="full-height full-width">
        <div class="q-pa-md q-mt-md row justify-between">
          <div
            v-if="rosca === ''"
            class="q-pa-xs q-mt-md row items-center q-gutter-*"
          >
            <q-form class="row q-col-gutter-md">
              <h5>Crear rosca</h5>
              <div class="col-12 col-sm-6">
                <q-select
                  transition-show="scale"
                  transition-hide="scale"
                  filled
                  style="width: 250px"
                  v-model="tipoRosca"
                  :options="options"
                  option-label="nombre"
                  label="Seleccione un tipo de rosca"
                  lazy-rules
                  emit-value
                  map-options
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />
                <q-input
                  v-model="descripcionRosca"
                  label="Ingresar detalle de rosca"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                >
                </q-input>
                <q-input
                  v-model="medida"
                  label="Ingresar medida de rosca"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                >
                </q-input>
                <q-btn
                  class="q-ml-sm q-mt-sm"
                  color="teal"
                  label="Crear rosca"
                  @click="postRosca(descripcionRosca, medida, tipoRosca)"
                />
              </div>
            </q-form>
          </div>
          <div
            v-if="rosca !== '' && cliente === ''"
            class="q-pa-xs row items-center q-gutter-*"
          >
            <q-form class="row q-col-gutter-md">
              <h5>Datos del cliente</h5>
              <div class="col-12 col-sm-6">
                <q-input
                  v-model.number="cuit"
                  label="Ingresar CUIT"
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                >
                </q-input>

                <q-btn
                  class="q-ml-sm q-mt-sm"
                  color="positive"
                  label="Cargar cliente"
                  @click="getClientes(cuit)"
                />
              </div>
            </q-form>
          </div>

          <div
            v-if="rosca !== '' && cliente !== '' && supervisorCargado === false"
            class="q-pa-xs row items-center q-gutter-*"
          >
            <q-form class="row q-col-gutter-md">
              <div class="col-12">
                <h5>Seleccione un supervisor</h5>
                <q-select
                  transition-show="scale"
                  transition-hide="scale"
                  filled
                  style="width: 250px"
                  v-model="supervisor"
                  :options="supervisores"
                  option-label="apellido"
                  label="Seleccione un supervisor"
                  lazy-rules
                  emit-value
                  map-options
                  :rules="[(val) => !!val || 'Campo obligatorio']"
                />
                <q-btn
                  class="q-ml-sm q-mt-sm"
                  color="positive"
                  label="Cargar supervisor"
                  @click="cargarSupervisor(supervisor)"
                />
              </div>
            </q-form>
          </div>

          <div
            v-if="rosca !== '' && cliente !== '' && supervisorCargado === true"
            class="q-pa-xs row items-center q-gutter-*"
          >
            <q-form>
              <h5>Crear orden</h5>
              <q-input
                v-model="detalleOrden"
                label="Ingresar detalle de la orden"
                :rules="[(val) => !!val || 'Campo obligatorio']"
              >
              </q-input>
              <div class="q-pa-md" style="max-width: 300px">
                <q-input
                  filled
                  v-model="fechaOrden"
                  mask="date"
                  :rules="['date']"
                >
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy
                        ref="qDateProxy"
                        cover
                        transition-show="scale"
                        transition-hide="scale"
                      >
                        <q-date v-model="fechaOrden">
                          <div class="row items-center justify-end">
                            <q-btn
                              v-close-popup
                              label="Close"
                              color="primary"
                              flat
                            />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <q-btn
                class="q-ml-sm q-mt-sm"
                color="positive"
                label="Crear orden"
                @click="postOrden(detalleOrden, fechaOrden, supervisor)"
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
import { date } from 'quasar'
import { useQuasar } from 'quasar'
import { Notify } from 'quasar'
export default {
  data() {
    return {
      cuit: '',
      cliente: '',
      tipoRosca: '',
      options: [],
      supervisores: [],
      descripcionRosca: '',
      medida: '',
      fechaOrden: '',
      detalleOrden: '',
      rosca: '',
      orden: '',
      supervisor: '',
      supervisorCargado: false
    }
  },
  mounted() {
    this.getTipoRosca(), this.getSupervisores()
  },
  methods: {
    getClientes(cuit) {
      if (cuit === '') {
        Notify.create({
          message: 'Falta agregar el campo CUIT',
          type: 'info',
          color: 'negative'
        })
      } else {
        let parameter = cuit
        this.$axios
          .get('http://localhost:8081/cliente/' + parameter)
          .then((res) => {
            this.cliente = res.data
            if (this.cliente) {
              Notify.create({
                message: 'El cliente se ha cargado con exito',
                type: 'positive',
                color: 'positive'
              })
            } else {
              Notify.create({
                message: 'No existe un cliente con el CUIT: ' + cuit,
                icon: 'close',
                color: 'negative'
              })
            }
          })
          .catch((err) => {
            console.err
          })
      }
    },

    getTipoRosca() {
      this.$axios
        .get('http://localhost:8081/rosca/tipoDeRosca')
        .then((res) => {
          this.options = res.data
        })
        .catch((err) => {
          console.err
        })
    },

    getSupervisores() {
      this.$axios
        .get('http://localhost:8081/supervisor')
        .then((res) => {
          this.supervisores = res.data
        })
        .catch((err) => {
          console.err
        })
    },

    cargarSupervisor(supervisor) {
      if (supervisor === '') {
        Notify.create({
          message: 'Falta seleccionar un supervisor',
          type: 'info',
          color: 'negative'
        })
      } else {
        Notify.create({
          message: 'El supervisor se ha cargado correctamente',
          type: 'positive',
          color: 'positive'
        })
        this.supervisorCargado = true
      }
    },

    postRosca(descripcionRosca, medida, tipoRosca) {
      if (tipoRosca === '' || medida === '' || descripcionRosca === '') {
        Notify.create({
          message: 'Falta completar algunos campos obligatorios',
          type: 'info',
          color: 'negative'
        })
      } else {
        this.$axios
          .post('http://localhost:8081/rosca/', {
            descripcionTecnica: descripcionRosca,
            medida: medida,
            tipoDeRosca: tipoRosca
          })
          .then((res) => {
            this.rosca = res.data
            if (this.rosca) {
              Notify.create({
                message: 'La rosca se ha creado con exito',
                type: 'positive',
                color: 'positive'
              })
            } else {
              Notify.create({
                message: 'Error al cargar la rosca, vuelva a intentarlo',
                icon: 'close',
                color: 'negative'
              })
            }
          })
          .catch((err) => {
            console.err
          })
      }
    },
    postOrden(detalleOrden, fechaOrden, supervisor) {
      const fechaAux = date.formatDate(fechaOrden, 'YYYY-MM-DD')
      if (detalleOrden === '' || fechaOrden === '' || supervisor === '') {
        Notify.create({
          message: 'Falta completar algunos campos obligatorios',
          type: 'info',
          color: 'negative'
        })
      } else {
        this.$axios
          .post('http://localhost:8081/orden/crearOrdenProduccion', {
            rosca: this.rosca,
            detalle: detalleOrden,
            fecha: fechaAux,
            cuitCliente: this.cliente.CUIT,
            supervisor: supervisor
          })
          .then((res) => {
            this.orden = res.data
            if (this.orden) {
              Notify.create({
                message: 'La orden de producción se ha cargado con exito',
                type: 'positive',
                color: 'positive'
              }),
                (this.rosca = ''),
                (this.cliente = ''),
                (this.orden = ''),
                (this.tipoRosca = ''),
                (this.descripcionRosca = ''),
                (this.medida = ''),
                (this.cuit = ''),
                (this.supervisor = ''),
                (this.detalleOrden = ''),
                (this.fechaOrden = '')
            } else {
              Notify.create({
                message: 'Error al cargar la orden de producción',
                type: 'close',
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

<style lang="scss" scoped></style>
