<template>
  <div class="tag">
    <div v-if="error">{{ error }}</div>
    <div v-if="events.length" class="layout">
      <TagCloud :events="events" />
      <EventList :events="eventWithTag" />
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script>
import TagCloud from "../components/TagCloud.vue";
import Spinner from "../components/Spinner.vue";
import EventList from "../components/EventList.vue";
import getEvents from "../composables/getEvents";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  components: { EventList, Spinner, TagCloud },
  setup() {
    const route = useRoute();
    const { events, error, load } = getEvents();

    load();
    const eventWithTag = computed(() => {
      return events.value.filter((p) => p.tags.includes(route.params.tag));
    });

    return { error, events, eventWithTag };
  },
};
</script>
