<template>
  <div class="manage_schools">
    <section>
      <div class="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
        <div v-if="locationsError">{{ locationsError }}</div>

        <router-link :to="{ name: 'Admin' }" class="text-blue-600 dark:text-blue-300">Go back to Admin</router-link>
        <h1 class="pt-1 pb-10 text-4xl font-semibold text-primary">Manage Schools</h1>
    
        <div class="w-full max-w-2xl px-5 mx-auto grid grid-cols-1 gap-4 md:px-8 lg:px-10">
            <div class="flex justify-between text-primary gap-3">
                <h1 class="flex-auto text-2xl font-semibold">Campus</h1>
                <Button color="blue"
                        text ="Add campus"
                        icon
                        iconPath="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        class=""
                        @click="showLocationModal = true" />
                <AddLocation v-if="showLocationModal" @closeModal="showLocationModal = false"/>
                <Button color="green"
                        text ="Add school"
                        icon
                        iconPath="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        class=""
                        @click="showSchoolModal = true" />
                <AddSchool v-if="showSchoolModal" @closeModal="showSchoolModal = false" :locations="locations"/>
            </div>
            <LocationsList v-if="locations.length" :locations="locations" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed } from "vue";

import getLocations from "@/composables/getLocations";
import LocationsList from "@/components/admin/LocationsList";
import Button from "@/components/Button";
import AddSchool from "@/components/admin/modals/AddSchool"
import AddLocation from "@/components/admin/modals/AddLocation"
// import Spinner from "@/components/Spinner";

export default {
    components: {
        LocationsList,
        Button,
        AddSchool,
        AddLocation
        // Spinner,
    },
    setup() {
        const { locations, locationsError, loadLocations } = getLocations();
        const store = useStore();
        const user = computed(() => store.state.user);
        const showSchoolModal = ref(false);
        const showLocationModal = ref(false);

        loadLocations();
    
        return { showSchoolModal, locations, showLocationModal, locationsError, user };
    },
};
</script>