import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    search_byStr    : {},
    info_byId       : {},
    lovedMoviesInfo_byId : JSON.parse(localStorage.getItem('lovedMoviesInfo_byId')),
  },
  mutations: {
    search_byStr_add (state, payload) {
      state.search_byStr[payload.str]= payload.data
    },

    info_byId_add (state, payload) {
      state.info_byId[payload.id]= payload.data
    },

    lovedMoviesInfo_add(state, payload) {

      let movieInfo = payload.movieInfo

      if(state.lovedMoviesInfo_byId == null){
        state.lovedMoviesInfo_byId = {}
      }
      Vue.set(state.lovedMoviesInfo_byId, movieInfo.imdbID, movieInfo)
      localStorage.setItem("lovedMoviesInfo_byId", JSON.stringify(state.lovedMoviesInfo_byId))
    },
    lovedMoviesInfo_remove(state, payload) {


      let movieInfo = payload.movieInfo

      Vue.delete(state.lovedMoviesInfo_byId, movieInfo.imdbID)

      localStorage.setItem("lovedMoviesInfo_byId", JSON.stringify(state.lovedMoviesInfo_byId))
    },

  },
  actions: {
  },
  modules: {
  }
})
