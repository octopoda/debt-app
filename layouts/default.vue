<template>
  <v-app light>
   
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
   
    <BottomNav />
  </v-app>
</template>

<script>
import BottomNav from '~/components/BottomNav';

export default {
  components: {
    BottomNav
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
