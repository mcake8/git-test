<template>
  <section>
    <v-data-table
      :headers="headers"
      :items="forks"
      :loading="isLoading"
      hide-default-footer
      :items-per-page="10"
      class="mb-3"
    >
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>
              {{ item.name }}
            </td>
            <td>
              {{ item.owner.login }}
            </td>
            <td>
              {{ item.stargazers_count }}
            </td>
            <td>
              <a :href="item.html_url" target="_blank">{{ item.html_url }}</a>
            </td>
            <td>
              <v-btn
                icon
                :color="item.isFavorite ? 'yellow' : 'grey'"
                @click="toggleFavorites(item)"
              >
                <v-icon>mdi-star</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>

    <v-pagination
      v-if="paginationLength > 1"
      v-model="pagination.page"
      :length="paginationLength"
      @input="tableUpdate"
      total-visible="10"
    ></v-pagination>
  </section>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'forksTable',

    data: vm => ({
      headers: [
        {
          text: 'Название',
          sortable: false
        },
        {
          text: 'Владелец',
          sortable: false
        },
        {
          text: 'Кол-во звезд',
          sortable: false
        },
        {
          text: 'Ссылка',
          sortable: false
        },
        {
          text: 'Избранное',
          sortable: false
        }
      ],

      pagination: {
        page: +vm.$route.query.page || 1
      }
    }),

    methods: {
      tableUpdate() {
        this.$router.push({
          path: '/results',
          query: {
            page: this.pagination.page,
            search: this.$route.query.search
          }
        });
      },

      toggleFavorites(item) {
        this.$store.commit('forks/setFavData', item);
      }
    },

    watch: {
      $route(to) {
        this.pagination.page = to.query.page || 1;
      }
    },

    computed: {
      ...mapState('forks', ['forks', 'isLoading', 'links']),

      paginationLength() {
        return this.links.last
          ? +this.links.last.page
          : +this.$route.query.page;
      }
    }
  };
</script>
