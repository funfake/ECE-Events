<template>
  <div class="home">
    <div v-if="error">{{ error }}</div>
    
    <div v-if="events.length">
        <TagCloud :events="events" />
        <EventList :events="events" />
    </div>

    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

import EventList from "@/components/EventList";
import getEvents from "@/composables/getEvents";
import Spinner from "@/components/Spinner";
import TagCloud from "@/components/TagCloud.vue";

export default {
  name: "Events",
  components: {
    EventList,
    Spinner,
    TagCloud,
  },
  setup() {
    const { events, error, load } = getEvents();
    const store = useStore();
    const user = computed(() => store.state.user);
    load();
    return { events, error, user };
  },
};
</script>
