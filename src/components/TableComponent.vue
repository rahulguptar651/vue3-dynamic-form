<template>
  <v-data-table :headers="headers" :items="usersData" :loading="loading" :search="search" must-sort items-per-page="5"
    :items-per-page-options="[
    { value: 5, title: '5' },
    { value: 10, title: '10' },
    { value: 20, title: '20' },
    { value: 50, title: '50' },
    { value: -1, title: '$vuetify.dataFooter.itemsPerPageAll' }
  ]">
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Users
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" class="me-2" append-inner-icon="mdi-magnify" density="compact"
          placeholder="Search Users..." variant="solo" hide-details single-line></v-text-field>
        <v-btn elevation="4" color="primary" variant="flat" :to="{ name: 'home' }">Home</v-btn>
      </v-toolbar>
    </template>

    <template v-slot:item.address="{ item }">
      {{ item.address.suite }}, {{ item.address.street }}, {{ item.address.city }}, {{ item.address.zipcode }}
    </template>

    <template v-slot:item.website="{ item }">
      <a :href="`https://www.${item.website}`" target="_blank" class="text-capitalize"> {{ item.website }}</a>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)">

        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>

    <template v-slot:no-data>
      <!-- @click="initialize" -->
      <v-btn color="primary">
        Reset
      </v-btn>
    </template>

  </v-data-table>
  <FormDialog :dialogModel="formDialog" :user="editedItem" @updateDialogModel="updateFormDialogModel"
    @saveItem="save" />
  <DeleteDialog :dialogModel="deleteDialog" @updateDialogModel="updateDeleteDialogModel"
    @deleteItem="deleteItemConfirm" />
</template>

<script>
import FormDialog from "@/components/dialogs/FormDialog.vue"
import DeleteDialog from "@/components/dialogs/DeleteDialog.vue"

export default {
  name: 'TableComponent',

  components: {
    FormDialog,
    DeleteDialog
  },

  props: ["loading", "usersData"],

  data: () => ({
    search: '',
    headers: [
      {
        title: 'Name',
        align: 'start',
        key: 'name',
      },
      { title: 'User Name', key: 'username' },
      { title: 'Email', key: 'email' },
      { title: 'Address', key: 'address' },
      { title: 'Phone', key: 'phone' },
      { title: 'Website', key: 'website' },
      { title: 'Company', key: 'company.name' },
      { title: 'Actions', key: 'actions' },
    ],
    deleteDialog: false,
    formDialog: false,

    editedIndex: -1,
    editedItem: {

      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",

      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
      }
    },
    defaultItem: {

      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",

      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
      }
    },
  }),


  methods: {

    editItem(item) {
      this.editedIndex = this.usersData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.formDialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.usersData.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.deleteDialog = true
    },

    deleteItemConfirm() {
      this.$store.dispatch('deleteUser', this.editedItem.id)
      this.updateDeleteDialogModel()
    },

    updateDeleteDialogModel() {
      this.deleteDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    updateFormDialogModel() {
      this.formDialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.usersData[this.editedIndex], this.editedItem)
        this.$store.dispatch('editUser', this.editedItem)
      } else {
        this.$store.dispatch('createNewUser', { ...this.editedItem, createdTime: Date.now() })
      }
      this.updateFormDialogModel()
    },
  }
}
</script>