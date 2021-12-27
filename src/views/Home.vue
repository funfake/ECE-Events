<template>
  <div class="home">
    <aside class="p-12 rounded-xl sm:p-16 lg:p-24">
      <div class="max-w-xl mx-auto text-center text-primary">
        <p v-if="user.data && user.loggedIn" class="font-medium text-md text-secondary">
          Welcome, {{ user.data.displayName }} !
        </p>
        <p v-else class="font-medium text-md text-secondary">
          We are proud to present you
        </p>

        <p class="mt-2 text-3xl font-bold sm:text-5xl">
          Your new all-in-one events app
        </p>

        <div class="mt-8 sm:items-center sm:justify-center sm:flex">
          <router-link v-if="user.data && user.loggedIn"  
                       class="block px-5 py-3 font-medium text-white bg-blue-500 rounded-lg shadow-xl hover:bg-blue-600"
                       :to="{ name: 'Events' }">
            Open the app
          </router-link>
          <a v-else @click="signIn" class="block px-5 py-3 font-medium text-white bg-blue-500 rounded-lg shadow-xl hover:bg-blue-600">
            Get started
          </a>

          <a
            href=""
            class="block px-5 py-3 mt-4 font-medium text-blue-500 rounded-lg hover:text-blue-600 sm:mt-0"
          >
            Learn more
          </a>
        </div>
      </div>
    </aside>

  </div>
</template>

<script>
import { firebaseAuth, provider } from "@/firebase/config";
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "Events",
  components: {
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);

    const signIn = () => {
      firebaseAuth.signInWithPopup(provider);
    };

    return { user, signIn };
  },
};
</script>
