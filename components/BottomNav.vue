<template>
    <v-bottom-navigation fixed app background-color="#FFFFFF" grow class="bottomNav">
      <v-btn>
        <nuxt-link to="/">
          <i class="material-icons">attach_money</i>
          <span>Loans</span>
        </nuxt-link>
      </v-btn>

      <v-btn>
        <span>Estimate</span>
        <i class="material-icons">timeline</i>
      </v-btn>

      <v-btn >
        <span>Settings</span>
        <i class="material-icons">settings</i>
      </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default {
    

}
</script>

<style lang="scss" scoped>
    .v-bottom-navigation {
        padding-bottom: 80px;
    }

    .v-btn__content {
      a, span, i {
        display:block;
        background:#FFFFFF;
      }
    }
</style>