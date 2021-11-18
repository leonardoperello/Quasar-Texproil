<template>
  <div class="q-pa-md">
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

    <q-stepper v-model="step" vertical color="primary" animated>
      <q-step :name="1" title="Crear rosca" icon="settings" :done="step > 1">
        <q-form class="row q-col-gutter-md">
          <div class="col-2">
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
          </div>
        </q-form>

        <q-stepper-navigation>
          <q-btn
            v-if="tipoRosca && medida && descripcionRosca"
            @click="postRosca(descripcionRosca, medida, tipoRosca, 2)"
            color="primary"
            label="Siguiente"
          />
          <q-btn
            v-if="!tipoRosca || !medida || !descripcionRosca"
            disable
            color="primary"
            label="Siguiente"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Ingrese el cuit de un cliente"
        icon="settings"
        :done="step > 2"
      >
        <q-form class="row q-col-gutter-md">
          <div class="col-2">
            <q-input
              v-model.number="cuit"
              label="Ingresar CUIT"
              :rules="[(val) => !!val || 'Campo obligatorio']"
            >
            </q-input>
            <q-btn
              v-if="cuit"
              @click="getClientes(cuit, 3)"
              color="primary"
              label="Siguiente"
            />
            <q-btn v-if="!cuit" disable color="primary" label="Siguiente" />
            <q-btn
              @click="step = 1"
              flat
              color="primary"
              label="Atras"
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-step>

      <q-step
        :name="3"
        title="Seleccione un supervisor"
        icon="settings"
        :done="step > 3"
      >
        <q-form class="row q-col-gutter-md">
          <div class="col-2">
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
          </div>
        </q-form>

        <q-stepper-navigation>
          <q-btn
            v-if="supervisor"
            @click="cargarSupervisor(supervisor, 4)"
            color="primary"
            label="Siguiente"
          />
          <q-btn v-if="!supervisor" disable color="primary" label="Siguiente" />
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
        title="Cargar orden de producción"
        icon="settings"
        :done="step > 4"
      >
        <q-form class="row q-col-gutter-md">
          <div class="col-2">
            <q-input
              v-model="detalleOrden"
              label="Ingresar detalle de la orden"
              :rules="[(val) => !!val || 'Campo obligatorio']"
            >
            </q-input>
            <q-input filled v-model="fechaOrden" mask="date" :rules="['date']">
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
        </q-form>

        <q-stepper-navigation>
          <q-btn
            v-if="detalleOrden && fechaOrden"
            @click="postOrden(detalleOrden, fechaOrden, supervisor)"
            color="positive"
            label="Crear orden"
          />
          <q-btn
            v-if="!detalleOrden || !fechaOrden"
            disable
            color="positive"
            label="Crear orden"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
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
      step: 1,
      supervisorCargado: false
    }
  },
  mounted() {
    this.getTipoRosca(), this.getSupervisores()
  },
  methods: {
    getClientes(cuit, num) {
      this.step = num
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

    cargarSupervisor(supervisor, num) {
      this.step = num
      this.supervisorCargado = true
    },

    postRosca(descripcionRosca, medida, tipoRosca, num) {
      this.step = num
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
    },
    postOrden(detalleOrden, fechaOrden, supervisor) {
      const fechaAux = date.formatDate(fechaOrden, 'YYYY-MM-DD')
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
              (this.fechaOrden = ''),
              (this.step = 1)
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
</script>

<style lang="scss" scoped></style>
