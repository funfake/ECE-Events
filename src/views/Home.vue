<template>
  <div class="home">
    <div
      v-if="user.data"
      class="user text-xl text-primary text-center my-5 p-2 font-semibold 
      "
    >
      Welcome, {{ user.data.displayName }} !
    </div>
    <div
      v-else
      class="user text-xl text-primary text-center my-5 p-2 font-semibold 
      "
    >
      Sign In to Create an event.
    </div>

    <div v-if="error">{{ error }}</div>
    
    <div v-if="event.length">
      <EventList :event="event" />
      <TagCloud :event="event" />
    </div>

    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import EventList from "../components/EventList";
import getEvents from "../composables/getEvents";
import Spinner from "../components/Spinner";
import TagCloud from "../components/TagCloud.vue";

export default {
  name: "Home",
  components: {
    EventList,
    Spinner,
    TagCloud,
  },
  setup() {
    const { event, error, load } = getEvents();
    const store = useStore();
    const user = computed(() => store.state.user);
    load();
    return { event, error, user };
  },
};
</script>
