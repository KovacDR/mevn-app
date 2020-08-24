<template>
  <div>
    <Nav />
    <div class="container px-4 pt-4 pb-0">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import 'bootswatch/dist/materia/bootstrap.min.css'

import { Component, Vue } from 'vue-property-decorator';
import Nav from './components/Nav.vue';

@Component({
  components: {
    Nav
  }
})
export default class App extends Vue {
  
}
</script>

<style>
  img {
    max-width: 100%;
    max-height: 100%;
  }
</style>
