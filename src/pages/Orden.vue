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

      <q-page-container>
        <q-page>
          <div class="q-pa-md">
            <div class="row">
              <div class="col">.col</div>
              <div class="col">.col</div>
            </div>

            <div class="row">
              <div class="col">.col</div>
              <div class="col">.col</div>
              <div class="col">.col</div>
            </div>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="scss" scoped>
.row > div {
  padding: 10px 15px;
  background: rgba(86, 61, 124, 0.15);
  border: 1px solid rgba(86, 61, 124, 0.2);
}
.row + .row {
  margin-top: 1rem;
}
</style>
