import parseLink from 'parse-link-header';

export default {
  namespaced: true,

  state: {
    forks: [],
    isLoading: false,
    links: {},
    favData: localStorage.favData ? JSON.parse(localStorage.favData) : []
  },

  mutations: {
    setForks(state, data) {
      state.forks = data.map(i => {
        return {
          ...i,
          isFavorite: state.favData.indexOf(i.id) >= 0
        };
      });
    },

    clearForks(state) {
      (state.forks = []), (state.links = {});
    },

    setLoading(state, data) {
      state.isLoading = data;
    },

    setLinks(state, data) {
      state.links = data;
    },

    setFavData(state, item) {
      if (item.isFavorite) {
        localStorage.setItem(
          'favData',
          JSON.stringify(state.favData.filter(i => i !== item.id))
        );
      } else {
        localStorage.setItem(
          'favData',
          JSON.stringify([...state.favData, item.id])
        );
      }

      state.favData = JSON.parse(localStorage.favData);

      state.forks = state.forks.map(i => {
        return {
          ...i,
          isFavorite: state.favData.indexOf(i.id) >= 0
        };
      });
    }
  },
  actions: {
    async getForks({ commit }, { search, page }) {
      commit('setLoading', true);

      try {
        const { data, headers } = await this.$axios.get(
          `/repos/${search}/forks`,
          {
            params: {
              page
            }
          }
        );

        commit('setForks', data);
        commit('setLinks', parseLink(headers.link));
      } catch (e) {
        console.log(e);
        commit('clearForks');
      }

      commit('setLoading', false);
    }
  }
};
