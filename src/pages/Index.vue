<template>

<q-page-container class="justify-center full-height full-width text-center">
  
 <logo></logo>

  <div class="q-pa-md justify-center full-height full-width text-center">

    <div class="row">
      <div class="col">transaccion</div>
      <div class="col">transaccion</div>
      <div class="col">transaccion</div>
    </div>

    <div class="row">
      <div class="col">transaccion</div>
      <div class="col">transaccion</div>
      <div class="col">transaccion</div>
    </div>

  </div>

</q-page-container>
</template>

<style lang="sass" scoped>
.row > div
  padding: 50px 15px
  background: $primary
  border: 1px solid #26A69A
  alignment: middle
.row + .row
  margin-top: 5rem
</style>

<script>
import logo from './Logo.vue'

export default {

 components: {
   logo: logo
 },
}
</script>
