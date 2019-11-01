import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    running: false,
    lang: 'zh',
    userinfo: null,
    songtitle: null,
    scoresObj: {},
    scroes: [],
    scroesppt: undefined,
  },
  getters: {
    getrunning: state => {
      return state.running;
    },
    getlang: state => {
      return state.lang;
    },
    getuserinfo: state => {
      return state.userinfo;
    },
    getsongtitle: state => {
      return state.songtitle;
    },
    getscoresObj: state => {
      return state.scoresObj;
    },
    getscroes: state => {
      return state.scroes;
    },
    getscroesppt: state => {
      return state.scroesppt;
    },
  },
  mutations: {
    setrunning: (state,i) => {
       state.running=i.data;
    },
    setlang: (state,i) => {
       state.lang=i.data;
    },
    setuserinfo: (state,i) => {
       state.userinfo=i.data;
    },
    setsongtitle: (state,i) => {
       state.songtitle=i.data;
    },
    setscoresObj: (state,i) => {
       state.scoresObj=i.data;
    },
    setscroes: (state,i) => {
       state.scroes=i.data;
    },
    setscroesppt: (state,i) => {
       state.scroesppt=i.data;
    },
  },
  actions: {
  },
  modules: {
  }
})
