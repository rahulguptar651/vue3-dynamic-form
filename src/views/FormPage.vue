<template>
  <DynamicForm :blocks="blocks" />
</template>

<script>
import Users from "@/views/Users.vue"
import DynamicForm from "@/components/DynamicForm.vue"
export default {
  name: 'FormPage',

  components: {
    Users,
    DynamicForm,
  },

  data: () => ({
    //
  }),
  computed: {
    blocks() {
      return this.$store.getters.getBlocks
    }
  }
}
</script>