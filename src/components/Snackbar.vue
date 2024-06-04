<template>
  <v-snackbar v-model="snackbar">
    {{ message }}

    <template v-slot:actions>
      <v-btn color="green" variant="text" @click="closeSnackbar">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",

  props: ['snackbarModel', 'message'],

  data: () => ({
    snackbar: false,
    timeout: 2000,
  }),

  watch: {
    snackbarModel(val) {
      this.snackbar = val
    }
  },

  methods: {
    closeSnackbar() {
      this.$emit('updateSanckbar', false)
    }
  }
}
</script>