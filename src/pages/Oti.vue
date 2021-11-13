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
          <q-toolbar-title> Cargar Orden de Trabajo Interna </q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-page-container>
        <q-page>
          <div class="q-pa-md">
            <div class="row">
              <div class="col">
                <div class="text-subtitle1" font-family="Arial">
                  Seleccionar fecha de ordenes
                </div>
                <div class="q-pa-md" style="max-width: 400px">
                  <q-form @submit="onSubmit" class="q-gutter-md">
                    <q-input
                      filled
                      v-model="date"
                      mask="date"
                      :rules="['date']"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            ref="qDateProxy"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date v-model="date">
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

                    <div>
                      <q-btn label="Submit" type="submit" color="primary" />
                    </div>
                  </q-form>
                </div>
              </div>
              <div class="col"></div>
            </div>
            <div class="row">
              <div class="q-pa-md">
                <q-table
                  title="Treats"
                  :rows="rows"
                  :columns="columns"
                  row-key="name"
                />
              </div>
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const date = ref('2020/03/20')
    return {
      model: ref(null),
      options: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],
      date,

      onSubmit(evt) {
        const formData = new FormData(evt.target)
        const data = []

        for (const [value] of formData.entries()) {
          data.push({
            value
          })
        }

        date.value = data
      }
    }
  },
  name: 'Otis',
  name: 'Ordenes',
  data() {
    return {
      columns,
      rows,
      otis: [],
      ordenes: []
    }
  },
  mounted() {
    this.getSectores()
    this.getOrdenes()
  },
  methods: {
    getOrdenes() {
      this.$axios
        .get('http://localhost:8081/oti/obtenerOrdenes/')
        .then((res) => {
          this.otis = res.data
          console.log('OTIS', res.data)
        })
        .catch((err) => {
          console.err
        })
    },
    getSectores() {
      this.$axios
        .get('http://localhost:8081/sector')
        .then((res) => {
          this.sectores = res.data
          console.log('SECTORES', res.data)
        })
        .catch((err) => {
          console.err
        })
    }
  }
}

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true
  },
  {
    name: 'calories',
    align: 'center',
    label: 'Calories',
    field: 'calories',
    sortable: true
  },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' }
]

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54
  }
]
</script>

<style lang="scss" scoped>
.row > div {
  padding: 10px 15px;
  border: 1px solid rgba(86, 61, 124, 0.2);
}
.row + .row {
  margin-top: 1rem;
}
.col {
  font-family: Arial, Helvetica, sans-serif;
}
.q-toolbar-title {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
