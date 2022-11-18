import { createStore } from 'vuex'

export default createStore({
  state: {
    compeleteSrc: '',
    progress: 0,
    pdfFile: null,
    signHistories: []
  },
  getters: {
  },
  mutations: {
    SET_COMPELETE_IMG (state, src) {
      state.compeleteSrc = src
    },
    SET_PROGRESS_STATE (state, progress) {
      state.progress = progress
    },
    SET_PDF_FILE (state, data) {
      state.pdfFile = data
      console.log('state.pdfFile: ', state.pdfFile)
    },
    ADD_SIGN_HISTORY (state, data) {
      state.signHistories.push(data)
      // console.log('state.pdfFile: ', state.pdfFile)
    }
  },
  actions: {
  },
  modules: {
  }
})
