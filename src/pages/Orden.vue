<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col">
        <q-btn
          padding="xs"
          color="white"
          text-color="black"
          label="Volver"
          to="/"
        />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div>Seleccionar fecha de ordenes</div>
        <div class="q-pa-md" style="max-width: 400px">
          <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input filled v-model="date" mask="date" :rules="['date']">
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
</script>

<style lang="scss" scoped>
.row > div {
  padding: 10px 15px;
  border: 1px solid rgba(86, 61, 124, 0.2);
}
.row + .row {
  margin-top: 1rem;
}
</style>
