<template>
  <header class="px-6 py-3 m-3 rounded-lg shadow bg-secondary">
    <router-link :to="{ name: 'Home' }">
      <h1 class="text-xl text-primary-hover md:text-2xl">Events</h1>
    </router-link>
    <nav class="items-baseline nav">
      <router-link class="text-primary-hover" :to="{ name: 'Home' }">
        Home
      </router-link>
      <div v-if="user.data">
        <router-link
          v-if="user.loggedIn && (user.data.admin || user.data.staff)"
          class="ml-4 text-primary-hover font-lighter"
          :to="{ name: 'Create' }">
          New Event
        </router-link>
      </div>
      <div v-if="user.data">
        <router-link
          v-if="user.loggedIn && user.data.admin"
          class="ml-4 text-primary-hover font-lighter"
          :to="{ name: 'Admin' }"
          >Admin
        </router-link>
      </div>
      <button
        class="px-2 py-1 ml-4 font-semibold text-red-500 bg-white rounded cursor-pointer hover:text-white hover:bg-red-500 transition-colors"
        v-if="user.loggedIn"
        @click="signOut">
        Sign Out
      </button>
      <button
        v-else
        @click="signIn"
        class="px-2 py-1 ml-3 font-semibold text-green-500 bg-white rounded cursor-pointer hover:text-white hover:bg-green-500 transition-colors">
        Sign In
      </button>
    </nav>
  </header>
</template>

<script>
import { firebaseAuth, provider } from "@/firebase/config";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);

    const signIn = () => {
      firebaseAuth.signInWithPopup(provider);
    };

    const signOut = () => {
      firebaseAuth.signOut();
    };

    return { signIn, signOut, user };
  },
};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
}
header nav {
  display: flex;
}

header a {
  text-decoration: none;
}

header>nav a.router-link-active, header>nav a.router-link-exact-active {
  font-weight: 700;
}
</style>
