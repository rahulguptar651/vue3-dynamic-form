<template>
  <v-container>
    <v-card>
      <!-- we are passing users list as props, so it's a parent child communication  -->
      <TableComponent v-if="usersList" :loading="loading" :users-data="usersList" />
    </v-card>
  </v-container>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue"
export default {
  name: 'Users',

  components: {
    TableComponent
  },

  data: () => ({
    loading: false
  }),

  computed: {
    usersList() {
      return this.$store.getters.getUsers
    }
  },

  created() {
    this.loading = true
    this.$store.dispatch('fetchUsers').then(() => {
      this.loading = false
    })
  }
}
</script>