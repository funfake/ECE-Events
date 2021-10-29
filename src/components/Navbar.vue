<template>
  <header class="bg-secondary rounded-lg shadow py-3 px-6 m-3">
    <router-link :to="{ name: 'Home' }">
      <h1 class="text-primary-hover text-xl md:text-2xl">Events</h1>
    </router-link>
    <nav class="nav items-baseline">
      <router-link class="text-primary-hover" :to="{ name: 'Home' }"
        >Home</router-link
      >
      <div v-if="user.data">
      <router-link
        v-if="user.loggedIn && (user.data.admin || user.data.staff)"
        class="text-primary-hover font-lighter
         hover:text-gray-100 ml-4"
        :to="{ name: 'Create' }"
        >New Event</router-link
      >
      </div>
      <button
        class="font-semibold text-red-500 bg-white px-2 py-1 rounded cursor-pointer hover:text-white hover:bg-red-500 transition-colors ml-4"
        v-if="user.loggedIn"
        @click="signOut"
      >
        Sign Out
      </button>
      <button
        v-else
        @click="signIn"
        class="font-semibold text-green-500 bg-white px-2 py-1 rounded cursor-pointer hover:text-white hover:bg-green-500 transition-colors ml-3"
      >
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
  font-weight: 500;
}
</style>
