<template>
  <div class="d-flex justify-center">
    <v-card width="400">
      <v-card-title>
        Vue Js
      </v-card-title>
      <v-card-text>
        <p>To see the list of users click below button</p>

        <v-btn elevation="4" color="primary" variant="flat" block :to="{ name: 'users' }">Users</v-btn>
        <p class="mt-3">To see the dynamic form from json click on below button</p>
        <v-btn elevation="4" color="primary" variant="flat" block :to="{ name: 'dynamic-form' }">Dynamic Form</v-btn>
      </v-card-text>
      <v-card-actions>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'Home',

  data: () => ({
    //
  }),
}
</script>