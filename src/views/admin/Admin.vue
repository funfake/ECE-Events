<template>
  <div class="admin">
    <section>
      <div class="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
        <div class="grid w-full grid-cols-1 gap-5 md:gap-10 mx-auto lg:grid-cols-3">

          <div v-if="user.data.admin" class="p-6 bg-secondary bg-secondary-hover hover-behavior cursor-pointer rounded-lg">
            <router-link :to="{ name: 'ManageUsers' }">
              <div class="flex items-center mb-3">
                <h1 class="text-xl font-semibold leading-none tracking-tighter text-primary">Users</h1>
              </div>
              <p class="mx-auto text-base leading-relaxed text-secondary">Manage users with their email address. Modify roles and delete profiles.</p>
              <div class="mt-4">
                <a href="#" class="inline-flex items-center mt-4 font-semibold text-blue-600 dark:text-blue-300 lg:mb-0" title="read more">Manage »</a>
              </div>
            </router-link>
          </div>

          <div v-if="user.data.admin" class="p-6 bg-secondary bg-secondary-hover cursor-pointer rounded-lg">
            <div class="flex items-center mb-3">
              <h1 class="text-xl font-semibold leading-none tracking-tighter text-primary">Teams</h1>
            </div>
            <p class="mx-auto text-base leading-relaxed text-secondary">Add or delete an object, modify it's attributes.</p>
            <div class="mt-4">
              <a href="#" class="inline-flex items-center mt-4 font-semibold text-yellow-600 dark:text-yellow-300 lg:mb-0" title="read more">Manage »</a>
            </div>
          </div>

          <div v-if="user.data.admin" class="p-6 bg-secondary bg-secondary-hover cursor-pointer rounded-lg">
            <router-link :to="{ name: 'ManageSchools' }">
            <div class="flex items-center mb-3">
              <h1 class="text-xl font-semibold leading-none tracking-tighter text-primary">Schools</h1>
            </div>
            <p class="mx-auto text-base leading-relaxed text-secondary">Add or delete an object, modify it's attributes.</p>
            <div class="mt-4">
              <a href="#" class="inline-flex items-center mt-4 font-semibold text-red-600 dark:text-red-300 lg:mb-0" title="read more">Manage »</a>
            </div>
            </router-link>
          </div>

          <div v-if="user.data.admin" class="p-6 bg-secondary bg-secondary-hover cursor-pointer rounded-lg">
            <div class="flex items-center mb-3">
              <h1 class="text-xl font-semibold leading-none tracking-tighter text-primary">Settings</h1>
            </div>
            <p class="mx-auto text-base leading-relaxed text-secondary">Manage users with their email address. Modify roles and delete profile.</p>
            <div class="mt-4">
              <a href="#" class="inline-flex items-center mt-4 font-semibold text-pink-600 dark:text-pink-300 lg:mb-0" title="read more">Proceed »</a>
            </div>
          </div>

          <!-- <div v-if="user.data.staff" class="p-6 bg-secondary bg-secondary-hover cursor-pointer rounded-lg">
            <div class="flex items-center mb-3">
              <h1 class="text-xl font-semibold leading-none tracking-tighter text-primary">Team Settings</h1>
            </div>
            <p class="mx-auto text-base leading-relaxed text-secondary">Modify your team's profile. Change your cover and details.</p>
            <div class="mt-4">
              <a href="#" class="inline-flex items-center mt-4 font-semibold text-indigo-600 dark:text-indigo-300 lg:mb-0" title="read more">Settings »</a>
            </div>
          </div>

          <div v-if="user.data.staff || user.data.admin" class="p-6 bg-secondary bg-secondary-hover cursor-pointer rounded-lg">
            <div class="flex items-center mb-3">
              <h1 class="text-xl font-semibold leading-none tracking-tighter text-primary">Events</h1>
            </div>
            <p class="mx-auto text-base leading-relaxed text-secondary">Manage your current events : modify, or delete them.</p>
            <div class="mt-4">
              <a href="#" class="inline-flex items-center mt-4 font-semibold text-green-600 dark:text-green-300 lg:mb-0" title="read more">Manage »</a>
            </div>
          </div> -->

        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);

    return { user };
  },
};
</script>

<style scoped>
</style>