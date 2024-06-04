<template>
  <v-dialog v-model="dialog" @click:outside="closeDialog" max-width="600px">
    <v-card>
      <v-card-title class="text-h5">Edit User</v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="user.name" label="Name" outlined
                  :rules="[v => !!v || 'This field is required']"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="user.username" label="Username" outlined
                  :rules="[v => !!v || 'This field is required']"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="user.email" type="email" label="Email" outlined
                  :rules="[v => !!v || 'This field is required']"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="user.address.street" label="Street" outlined
                  :rules="[v => !!v || 'This field is required']"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="user.address.city" label="City" outlined
                  :rules="[v => !!v || 'This field is required']"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="user.address.zipcode" label="Zipcode" outlined
                  :rules="[v => !!v || 'This field is required']"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="user.phone" label="Phone" outlined
                  :rules="[v => !!v || 'This field is required']"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="user.website" label="Website" outlined
                  :rules="[v => !!v || 'This field is required']"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="user.company.name" label="Company Name" outlined
                  :rules="[v => !!v || 'This field is required']"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="user.company.catchPhrase" label="Catch Phrase" outlined
                  :rules="[v => !!v || 'This field is required']"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="user.company.bs" label="Business" outlined
                  :rules="[v => !!v || 'This field is required']"></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="secondry" @click="closeDialog">
          Discard
        </v-btn>
        <v-btn color="primary" @click="saveItem">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "FormDialog",

  props: ['dialogModel', 'user'],

  data: () => ({
    dialog: false,
    valid: true,
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
    async saveItem() {
      const { valid } = await this.$refs.form.validate()

      if (valid) {

        this.$emit('saveItem')
      }
    }
  }
}
</script>