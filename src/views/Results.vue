<template>
  <v-container>
    <section>
      <div class=" mt-10">
        <div class="display-1 mb-5  ">Результаты поиска</div>
        <search-bar />
      </div>

      <forksTable v-if="isResult" />

      <div class="body-1" v-else>
        По запросу <b>{{ $route.query.search }} </b>ничего не найдено
      </div>
    </section>
  </v-container>
</template>

<script>
  export default {
    name: 'Results',

    created() {
      this.$store.dispatch('forks/getForks', this.$route.query);
    },

    computed: {
      isResult() {
        return (
          this.$store.state.forks.forks.length ||
          this.$store.state.forks.isLoading
        );
      }
    },

    watch: {
      $route(to) {
        this.$store.dispatch('forks/getForks', to.query);
      }
    },

    components: {
      forksTable: () => import('@/components/forksTable'),
      searchBar: () => import('@/components/searchBar')
    }
  };
</script>
