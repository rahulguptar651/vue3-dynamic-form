<template>
  <div>
    <v-container>
      <v-card>
        <div class="d-flex justify-space-between">
          <v-card-title>Dynamic Form</v-card-title>
          <v-btn elevation="4" class="mt-2" variant="flat" :to="{ name: 'home' }">Go Home</v-btn>
        </div>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-row v-for="block in  blocks " :key="block.token">

              <v-col v-if="block.type === 'text'" cols="12">
                <v-text-field v-model="formModel[block.token]" :label="block.props.title"
                  :placeholder="block.props.placeholder" :required="block.props.required"
                  :rules="dynamicRules(block)" />
              </v-col>

              <v-col v-if="block.type === 'checkbox'" cols="12">
                <v-checkbox v-model="formModel[block.token]" :label="block.props.title"
                  :rules="dynamicRules(block)"></v-checkbox>
              </v-col>

              <v-col v-if="block.type === 'radio'" cols="12">
                <v-radio-group v-model="formModel[block.token]" :rules="dynamicRules(block)">
                  <v-radio v-for="item in block.props.items" :key="item" :value="item"
                    :label="block.props.title"></v-radio>
                </v-radio-group>
              </v-col>

              <v-col v-if="block.type === 'select'" cols="12">
                <v-select v-model="formModel[block.token]" :label="block.props.title" :items="block.props.items"
                  :rules="dynamicRules(block)"></v-select>
              </v-col>

              <v-col v-if="block.type === 'date'" cols="12">
                <v-text-field v-model="formModel[block.token]" :placeholder="block.props.placeholder" type="date"
                  :rules="dynamicRules(block)"></v-text-field>
              </v-col>

            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="flat" @click="submitForm">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <Snackbar :snackbarModel="snackbarModel" :message="message" @updateSanckbar="updateSanckbar" />
  </div>
</template>

<script>
import Snackbar from "@/components/Snackbar.vue"

export default {

  name: 'DynamicForm',

  components: {
    Snackbar
  },

  props: ['blocks'],

  data: () => ({
    snackbarModel: false,
    message: '',
    dateMenu: false,
    valid: true,
    dob: '',
    formModel: {}
  }),

  created() {
    this.blocks.forEach((block) => {
      this.formModel[block.token] = block.props.default ?? ''
    });
  },

  methods: {
    async submitForm() {
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        this.message = 'Form submitted successfully'
        this.snackbarModel = true
        setTimeout(() => {
          this.$router.push({ name: 'home' })
        }, 1000);
      }
    },

    dynamicRules(block) {
      if (typeof block.props.required === 'string') {
        return [(v) => !this.formModel[block.props.required] || !!v || 'This field is required'];
      } else {
        return [v => !block.props.required || !!v || 'This field is required']
      }
    },

    updateSanckbar(val) {
      this.snackbarModel = val
    }
  }
}
</script>