import Vue from 'vue'
import Mobile from '../components/mobile.vue'

module.exports = {
  install: function (Vue, options) {
    Vue.component('mobile', Clock);
  }
};