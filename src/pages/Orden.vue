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
        <div class="q-pa-md q-mt-md row justify-between">
          <div class="q-pa-xs q-mt-md row items-center q-gutter-*">
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
                  color="primary"
                  label="Crear rosca"
                  @click="postRosca(descripcionRosca, medida, tipoRosca)"
                />
              </div>
            </q-form>
          </div>
          <div class="q-pa-xs row items-center q-gutter-*">
            <q-form v-if="rosca !== ''" class="row q-col-gutter-md">
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
                  color="primary"
                  label="Buscar"
                  @click="getClientes(cuit)"
                />
                <!--
                <div class="q-pa-xs q-mt-md row items-center q-gutter-*">
                  <span v-if="cliente !== undefined">
                    Nombre: {{ cliente.nombre }}
                  </span>
                </div>
                <div class="q-pa-xs q-mt-md row items-center q-gutter-*">
                  <span v-if="cliente !== undefined">
                    Apellido: {{ cliente.apellido }}
                  </span>
                </div> -->
                <div class="q-pa-xs q-mt-md row items-center q-gutter-*">
                  <span v-if="cliente !== undefined">
                    Empresa: {{ cliente.nombreEmpresa }}
                  </span>
                </div>
              </div>
            </q-form>
          </div>
          <div
            v-if="rosca !== '' && cliente !== ''"
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
                color="primary"
                label="Crear orden"
                @click="postOrden(detalleOrden, fechaOrden)"
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
export default {
  data() {
    return {
      cuit: '',
      cliente: '',
      tipoRosca: '',
      options: [],
      descripcionRosca: '',
      medida: '',
      fechaOrden: '',
      detalleOrden: '',
      rosca: '',
      orden: ''
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
          this.form2 = true
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
    },
    postRosca(descripcionRosca, medida, tipoRosca) {
      this.$axios
        .post('http://localhost:8081/rosca/', {
          descripcionTecnica: descripcionRosca,
          medida: medida,
          tipoDeRosca: tipoRosca
        })
        .then((res) => {
          this.rosca = res.data
          console.log('creando rosca...', res.data)
        })
        .catch((err) => {
          console.err
        })
    },
    postOrden(detalleOrden, fechaOrden) {
      const fechaAux = date.formatDate(fechaOrden, 'YYYY-MM-DD')
      this.$axios
        .post('http://localhost:8081/orden/crearOrdenProduccion', {
          rosca: this.rosca,
          detalle: detalleOrden,
          fecha: fechaAux,
          cuitCliente: this.cliente.CUIT,
          supervisor: {
            numeroEmpleado: 5.0,
            DNI: '20-596-7118',
            nombre: 'Suzanne',
            apellido: 'Kleynermans',
            telefono: '253-396-2243',
            nombreUsuario: 'skleynermans4',
            contraseña: 'LACiCk',
            email: 'skleynermans4@acquirethisname.com'
          }
        })
        .then((res) => {
          this.rosca = res.data
          console.log('creando orden...', res.data)
        })
        .catch((err) => {
          console.err
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
