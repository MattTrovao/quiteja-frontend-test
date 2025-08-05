<template>
  <DefaultContainer>
    <PageTitle>
      {{ userId ? 'Editar' : 'Criar' }}
      Usuário
    </PageTitle>

    <v-col cols="12">
      <v-form @submit.prevent="saveUser" v-if="user">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="user.picture"
              label="Foto"
              outlined
              :loading="loading"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.firstName"
              label="Nome"
              outlined
              :loading="loading"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="user.lastName"
              label="Sobrenome"
              outlined
              :loading="loading"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="user.email"
              label="Email"
              outlined
              :loading="loading"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="user.title"
              :items="titleOptions"
              label="Título"
              outlined
            ></v-select>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              v-model="user.gender"
              :items="genderOptions"
              label="Gênero"
              outlined
            ></v-select>
          </v-col>

          <v-col cols="12" class="d-flex justify-end gap-2">
            <v-btn
              @click="returnPage"
              :loading="loading"
            >
              Voltar
            </v-btn>
            <v-btn
              type="submit"
              color="primary"
              :loading="loading"
            >
              Salvar Alterações
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>

  </DefaultContainer>
</template>

<script>
import router from '@/router';

export default {
  name: "UsersView",

  data() {
    return {
      loading: false,
      userId: '',
      user: null,
      titleOptions: [
        { text: 'mr', value: 'mr' },
        { text: 'miss', value: 'miss' }
      ],
      genderOptions: [
        { text: 'male', value: 'male' },
        { text: 'female', value: 'female' },
        { text: 'other', value: 'other' }
      ]
    };
  },

  mounted() {
    this.initFunction();
  },

  methods: {
    async initFunction() {    
      this.userId = this.$route.params.user_id;
      
      if(this.userId) {
        this.loading = true;

        try {
          const userData = await this.$store.dispatch("user/fetchUserById", this.userId);
          this.user = userData;
        } catch (error) {
          console.error("Erro ao carregar usuário:", error);
        } finally {
          this.loading = false;
        }
      } else {
        this.user = {
          picture: '',
          firstName: '',
          lastName: '',
          email: '',
          title: '',
        }
      }
    },

    async saveUser() {
      this.loading = true;
      try {
        if(this.userId) {

        await this.$store.dispatch("user/updateUser", {
          id: this.user.id,
          payload: this.user
        });
        } else {
          await this.$store.dispatch("user/createUser", this.user);
        }
        // Mostrar mensagem de sucesso
        this.$toast.success("Usuário atualizado com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        this.$toast.error("Erro ao atualizar usuário");
      } finally {
        this.loading = false;
        router.push({ name: "users" });
      }
    },

    returnPage(){
      router.push({ name: "users"});

    }
  },
};
</script>