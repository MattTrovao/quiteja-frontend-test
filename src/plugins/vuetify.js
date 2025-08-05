import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#9F21E3',  
        secondary: '#FF7900', 
      },
      dark: {
        primary: '#E498FF', 
        secondary: '#FCCC5D',
      },
    },
    options: {
      customProperties: true, 
    },
    dark: false, 
  },
})