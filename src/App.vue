<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      light
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center menu">
        <svg @click="toogleTheme" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 640 640"><path d="M420.9 448C428.2 425.7 442.8 405.5 459.3 388.1C492 353.7 512 307.2 512 256C512 150 426 64 320 64C214 64 128 150 128 256C128 307.2 148 353.7 180.7 388.1C197.2 405.5 211.9 425.7 219.1 448L420.8 448zM416 496L224 496L224 512C224 556.2 259.8 592 304 592L336 592C380.2 592 416 556.2 416 512L416 496zM312 176C272.2 176 240 208.2 240 248C240 261.3 229.3 272 216 272C202.7 272 192 261.3 192 248C192 181.7 245.7 128 312 128C325.3 128 336 138.7 336 152C336 165.3 325.3 176 312 176z" fill="var(--white)"/></svg>
        <router-link to="/" class="__link">
          Home
        </router-link>
        <router-link to="/users" class="__link">
          Usuários
        </router-link>
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    theme: 'light',
  }),

  mounted() {
    document.documentElement.setAttribute('data-mode', this.theme);
  },

  methods: {
    toogleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-mode', this.theme);
    },
  },
  
};
</script>

<style lang="scss" >
@import './styles/theme/theme.scss';
.menu {
  display: flex;
  gap: 1rem;

  .__link {
    color: var(--secondary-50);
    font-weight: bold;
    text-decoration: none;
    position: relative;
    transition: var(--transition);

    &::after {
      content: '';
      display: block;
      width: 10%;
      height: 2px;
      background: var(--secondary-50);
      margin-top: 2px;
      opacity: 0;
      transition: inherit;
    }
    
    &:hover{
      color: var(--secondary-200);
      &::after{
        width: 100%;
        opacity: 1;
      }
    }

  }
}
</style>
