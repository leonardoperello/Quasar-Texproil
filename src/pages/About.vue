<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <div class="col-xs-12 col-lg-4" v-for="(oti, index) in otis" :key="index">
      <q-card> {{ oti.rosca.descripcionTecnica }} </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Otis',
  data() {
    return {
      otis: []
    }
  },
  mounted() {
    this.getOtis()
    this.getSectores()
  },
  methods: {
    getOtis() {
      this.$axios
        .get('http://localhost:8081/oti')
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
