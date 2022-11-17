import { createStore } from 'vuex'

export default createStore({
  state: {
    pdfFile: null
  },
  getters: {
  },
  mutations: {
    SET_PDF_FILE (state, data) {
      state.pdfFile = data
      console.log('state.pdfFile: ', state.pdfFile)
    }
  },
  actions: {
  },
  modules: {
  }
})
