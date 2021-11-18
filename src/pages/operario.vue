<template>
  <div class="q-mt-sm q-mr-sm">
    <q-toolbar class="bg-primary text-white shadow-2">
      <q-toolbar-title>Tareas asignadas</q-toolbar-title>
    </q-toolbar>
    <q-list bordered>
      <q-item class="text-weight-bolder text-center">
        <q-item-section>
          <q-item-label>NOMBRE</q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label>DESCRIPCION </q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label>ESTADO </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
    </q-list>

    <q-list bordered>
      <q-item
        v-for="tarea in tareas"
        :key="tarea._id"
        class="q-my-sm text-center"
        clickable
        v-ripple
        @click="Verdetalle(tarea)"
      >
        <q-item-section>
          <q-item-label>{{ tarea.nombre }}</q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ tarea.descripcion }}</q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-badge outline align="middle" color="teal">
              {{ tarea.estado[tarea.estado.length - 1].tipoEstado.nombre }}
            </q-badge></q-item-label
          >
        </q-item-section>
      </q-item>

      <q-separator />
    </q-list>
  </div>
  <div class="q-pa-md">
    <q-drawer
      side="right"
      v-model="drawerRight"
      backo
      show-if-above
      :width="600"
      :breakpoint="500"
      class="q-mt-sm bg-blue-grey-10 text-white"
    >
      <q-toolbar class="bg-teal-9 text-white shadow-2">
        <q-toolbar-title>Detalle tarea</q-toolbar-title>
        <q-btn
          class="q-ml-sm q-mt-sm"
          color="negative"
          label="CERRAR"
          @click="cerrarSidebar()"
        />
      </q-toolbar>

      <q-toolbar-title class="text-weight-bolder"
        >Descripcion:
      </q-toolbar-title>
      <span align="middle">{{ tarea.descripcion }}</span>
      <q-toolbar-title class="text-weight-bolder"
        >Tipo de tarea:
      </q-toolbar-title>
      <span align="middle">{{ tarea.nombre }}</span>
      <q-toolbar-title class="text-weight-bolder">Sector: </q-toolbar-title>
      <span align="middle">{{ sector.nombre }}</span>
      <q-toolbar-title class="text-weight-bolder"
        >Fecha inicio:
      </q-toolbar-title>
      <span align="middle">{{ tarea.fechaInicio }}</span>
      <div class="q-pa-md q-gutter-sm">
        <q-btn
          color="primary"
          label="Cambiar Estado"
          @click="cambiarEstadoD()"
        />
        <q-btn color="secondary" label="Detalle Oti" />
      </div>
    </q-drawer>
  </div>
  <div class="q-pa-md">
    <q-drawer
      side="right"
      v-model="cambiarEstado"
      show-if-above
      backo
      :width="600"
      :breakpoint="500"
      class="q-mt-sm bg-blue-grey-10"
    >
      <q-toolbar class="bg-teal-9 text-white shadow-2">
        <q-toolbar-title>Cambiar Estado</q-toolbar-title>
      </q-toolbar>
      <div class="q-pa-md q-mt-none text-white">
        <q-option-group :options="options" type="radio" v-model="group" />
      </div>

      <div class="q-ml-sm q-mr-sm">
        <q-toolbar-title class="text-white">Descripcion</q-toolbar-title>
        <q-editor
          v-model="editor"
          :definitions="{
            bold: { label: 'Bold', icon: null, tip: 'My bold tooltip' }
          }"
        />
      </div>
      <div class="row justify-end q-mr-sm q-mt-sm">
        <q-btn color="negative" label="cancelar" @click="cerrarEstado()" />
        <q-btn
          class="q-ml-sm"
          color="positive"
          label="guardar"
          @click="guardarCambios()"
        />
      </div>
    </q-drawer>
  </div>
</template>

<script>
import { getAuth } from 'firebase/auth'

export default {
  data() {
    return {
      sector: '',
      cambiarEstado: true,
      drawerRight: true,
      tareas: [],
      tarea: {},
      group: null,
      editor: '',
      oti: null,

      options: [
        { label: 'finalizada', value: 'finalizada', color: 'primary' },
        { label: 'detenida', value: 'detenida', color: 'primary' },
        { label: 'abortada', value: 'abortada', color: 'primary' },
        { label: 'en progreso', value: 'en progreso', color: 'primary' }
      ]
    }
  },
  mounted() {
    this.cambiarEstado = false
    this.drawerRight = false
    this.getTareas()
  },
  methods: {
    async cambiarEstadoD() {
      this.cambiarEstado = true
    },

    async cerrarEstado() {
      this.cambiarEstado = false
      this.drawerRight = true
    },

    async Verdetalle(tarea) {
      this.cambiarEstado = false
      this.drawerRight = true
      this.tarea = tarea
      this.sector = tarea.sector
    },
    async cerrarSidebar() {
      this.drawerRight = false
    },

    async getTareas() {
      const auth = getAuth()
      const user = auth.currentUser
      const operario = await this.$axios.get(
        'http://localhost:8081/empleado/usuario',
        {
          params: {
            usuario: user.email
          }
        }
      )
      this.oti = await this.$axios.get(
        `http://localhost:8081/estado/${operario.data._id}`
      )
      this.tareas = this.oti.data.tareasOperario
    },

    async guardarCambios() {
      Notify.create({
        message: '¿Desea guardar los cambios?',
        color: 'primary',
        actions: [
          {
            label: 'Aceptar',
            color: 'white',
            handler: () => {
              this.guardar()
            }
          },
          { label: 'Cancelar', color: 'white' }
        ]
      })
    },

    async guardar() {
      try {
        const tareasAUX = await this.$axios.put(
          'http://localhost:8081/estado',
          {
            idOti: this.oti.data.idOti,
            idTarea: this.tarea._id,
            nombreSector: this.tarea.sector.nombre,
            observacion: this.editor,
            tipoEstado: {
              nombre: this.group,
              descripcion: ''
            }
          }
        )
        Notify.create({
          message: 'Los cambios se guardaron correctamente',
          type: 'positive',
          color: 'positive'
        })
        this.getTareas()
        this.cambiarEstado = false
        this.drawerRight = false
      } catch (error) {
        Notify.create({
          message: 'Error al guardar los cambios!',
          type: 'info',
          color: 'negative'
        })
      }
    }
  }
}
import { Notify } from 'quasar'
</script>

<style lang="scss" scoped>
.sedebar {
  background: #000;
}
</style>
