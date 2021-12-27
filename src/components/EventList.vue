<template>
  <div  class="px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 event-list md:px-8 lg:px-10">
    <div v-for="event in events" :key="event">
      <SingleEvent :event="event" />
    </div>
  </div>
</template>

<script>
import SingleEvent from "./SingleEvent.vue";
export default {
  props: ["events"],
  components: { SingleEvent },
  setup() {},
};
</script>

<style></style>
