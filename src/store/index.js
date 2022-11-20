import { createStore } from 'vuex'
import { useLocalStorage } from '@vueuse/core'

const historyStorage = useLocalStorage('img', [])

export default createStore({
  state: {
    compeleteSrc: '',
    progress: 0,
    pdfFile: null,
    signHistories: historyStorage,
    canvasInstanceList: []
  },
  getters: {
  },
  mutations: {
    SET_CANVAS_LIST (state, list) {
      state.canvasInstanceList = list
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
      // historyStorage.value.set(state.signHistories)
      // console.log('state.pdfFile: ', state.pdfFile)
    }
  },
  actions: {
  },
  modules: {
  }
})
