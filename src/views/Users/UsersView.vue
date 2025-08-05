<template>
  <DefaultContainer>
    <PageTitle>Usuários</PageTitle>

    <v-col cols="12">
      <div class="flex justify-end my-4">
        <v-text-field
          v-model="name"
          label="Nome"
          outlined
          :loading="loading"
        ></v-text-field>
        <DefaultButton class="btn" @click="newUser">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
            <path
              d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"
              fill="var(--primary-500)"
            />
          </svg>
        </DefaultButton>
      </div>
    </v-col>

    <v-col cols="12">
      <div class="list">
        <div class="__users" v-for="user in filteredUsers" :key="user.id">
          <div class="__action">
            <DefaultButton class="btn" @click="editUser(user.id)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path
                  d="M416.9 85.2L372 130.1L509.9 268L554.8 223.1C568.4 209.6 576 191.2 576 172C576 152.8 568.4 134.4 554.8 120.9L519.1 85.2C505.6 71.6 487.2 64 468 64C448.8 64 430.4 71.6 416.9 85.2zM338.1 164L122.9 379.1C112.2 389.8 104.4 403.2 100.3 417.8L64.9 545.6C62.6 553.9 64.9 562.9 71.1 569C77.3 575.1 86.2 577.5 94.5 575.2L222.3 539.7C236.9 535.6 250.2 527.9 261 517.1L476 301.9L338.1 164z"
                  fill="var(--primary-500)"
                />
              </svg>
            </DefaultButton>
            <DefaultButton class="btn" @click="openDeleteDialog(user.id)">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path
                  d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z"
                  fill="var(--secondary-900)"
                />
              </svg>
            </DefaultButton>
          </div>

          <v-avatar size="80" v-if="user.picture">
            <v-img
              :alt="`${user.firstName} ${user.lastName}`"
              :src="user.picture"
            ></v-img>
          </v-avatar>
          <v-avatar color="secondary" size="80" v-else></v-avatar>
          <h2 class="name">
            <small v-if="user.title">{{ user.title }}.</small>
            {{ user.firstName }} {{ user.lastName }}
          </h2>
        </div>
      </div>
    </v-col>

    <v-dialog v-model="deleteDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Confirmar exclusão</v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir este usuário?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="deleteDialog = false"
            >Cancelar</v-btn
          >
          <v-btn color="red darken-1" text @click="confirmDelete"
            >Confirmar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </DefaultContainer>
</template>

<script>
import router from "@/router";
export default {
  name: "UsersView",

  data() {
    return {
      loading: false,
      users: [],
      filteredUsers: [], 
      name: '',
      userToDelete: "",
      deleteDialog: false,
    };
  },

   watch: {
    name(newValue) {
      this.filterUsers(newValue);
    },
    
    users() {
      this.filterUsers(this.name);
    }
  },

  mounted() {
    this.initFunction();
  },

  methods: {
    async initFunction() {
      this.loading = true;
      const res = await this.$store.dispatch("user/fetchUsers", {});
      this.users = res.data;
      this.filteredUsers = res.data;
      this.total = res.total;
      this.loading = false;
    },

    filterUsers(searchTerm) {
      if (!searchTerm) {
        this.filteredUsers = [...this.users];
        return;
      }
      
      const term = searchTerm.toLowerCase();
      this.filteredUsers = this.users.filter(user => 
        user.firstName.toLowerCase().includes(term) || 
        user.lastName.toLowerCase().includes(term) ||
        (user.title && user.title.toLowerCase().includes(term))
      );
    },

    newUser() {
      router.push({ name: "manage user" });
    },
    editUser(userId) {
      router.push({ name: "manage user", params: { user_id: userId } });
    },

    openDeleteDialog(userId) {
      this.userToDelete = userId;
      this.deleteDialog = true;
    },

    async confirmDelete() {
      if (!this.userToDelete) return;

      try {
        await this.$store.dispatch("user/deleteUser", this.userToDelete);

        this.users = this.users.filter((user) => user.id !== this.userToDelete);

        this.deleteDialog = false;

        this.$root.$emit("show-snackbar", {
          text: "Usuário excluído com sucesso",
          color: "success",
        });
      } catch (error) {
        console.error("Erro ao deletar:", error);
        this.$root.$emit("show-snackbar", {
          text: "Erro ao excluir usuário",
          color: "error",
        });
      } finally {
        this.userToDelete = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  svg {
    width: 18px;
    height: 18px;
  }
}
.list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media only screen and (max-width : 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width : 600px) {
    grid-template-columns: repeat(1, 1fr);
  }

  .__users {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: 2px solid var(--primary-500);
    border-radius: 1rem;

    .__action {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      justify-content: center;
      position: absolute;
      top: 10px;
      right: 10px;
    }

    h2 {
      font-size: 1rem;
      text-align: center;
      small {
        color: var(--primary-800);
      }
    }
  }
}

html[data-mode="dark"] {
  .list {
    .__users {
      background: var(--secondary-200);
    }
  }
}
</style>
