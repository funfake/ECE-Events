<template>
  <div class="manage_users">
    <section>
      <div class="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
        <div v-if="error">{{ error }}</div>
        
        <router-link :to="{ name: 'Admin' }" class="text-blue-600 dark:text-blue-300">Go back to Admin</router-link>
        <h1 class="text-4xl font-semibold text-primary pt-1 pb-10">Manage Users</h1>
    
        <div class="grid grid-cols-1 gap-6 px-5 md:px-8 lg:px-10 mx-auto w-full max-w-2xl">
            <div class="text-primary">
                <input  type="text" 
                        v-model="email"
                        id="event-form-title" 
                        class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 my-2 bg-secondary text-primary placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                        placeholder="Search by email (press enter when done)"
                        v-on:keyup.enter="load(email)"
                />
                <!-- @change="load(email)"  -->
            </div>
            <UsersList v-if="users.length" :users="users" />
            <!-- <div v-if="email != '' && !users.length">
                <Spinner />
            </div> -->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed } from "vue";

import getUsersWithRoles from "@/composables/getUsersWithRoles";
import UsersList from "@/components/admin/UsersList";
import Spinner from "@/components/Spinner";

export default {
    components: {
        UsersList,
        Spinner,
    },
    setup() {
        const { users, error, load } = getUsersWithRoles();
        const store = useStore();
        const user = computed(() => store.state.user);
        // search
        const email = ref("");

        return { users, error, user, email, load };
    },
};
</script>

<style>

</style>