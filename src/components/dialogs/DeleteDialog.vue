<template>
  <v-dialog v-model="dialog" @click:outside="closeDialog" max-width="400px">
    <v-card>
      <v-card-title class="text-h5">Are you sure you want to delete this User?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="closeDialog">Cancel</v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DeleteDialog",

  props: ['dialogModel'],

  data: () => ({
    dialog: false
  }),

  watch: {
    dialogModel(val) {
      this.dialog = val
    }
  },

  methods: {
    closeDialog() {
      this.$emit('updateDialogModel', false)
    },
    deleteItemConfirm() {
      this.$emit('deleteItem')
    }
  }
}
</script>