<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col xs="12" sm="12" md="6" lg="4">
        <div class="headline mb-5">Привет, я поиск по forks</div>
        <search-bar />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Main',

    components: {
      searchBar: () => import('@/components/searchBar')
    }
  };
</script>
