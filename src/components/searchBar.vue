<template>
  <v-form @submit.prevent="getForks" class="d-flex align-end mb-5">
    <v-text-field
      placeholder=":owner/:repositoryName"
      v-model="search"
      hide-details
    />
    <v-btn color="primary" type="submit" large class="ml-5">Найти</v-btn>
  </v-form>
</template>

<script>
  export default {
    name: 'searchBar',

    data: () => ({
      search: ''
    }),

    methods: {
      async getForks() {
        this.$router.push({
          path: '/results',
          query: { search: this.search }
        });
      }
    }
  };
</script>
