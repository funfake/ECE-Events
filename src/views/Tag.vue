<template>
  <div class="tag">
    <div v-if="error">{{ error }}</div>
    <div v-if="event.length" class="layout">
      <TagCloud :event="event" />
      <EventList :event="eventWithTag" />
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
    const { event, error, load } = getEvents();

    load();
    const eventWithTag = computed(() => {
      return event.value.filter((p) => p.tags.includes(route.params.tag));
    });

    return { error, event, eventWithTag };
  },
};
</script>
