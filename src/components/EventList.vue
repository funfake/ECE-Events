<template>
  <div  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 event-list px-5 md:px-8 lg:px-10">
    <div v-for="event in event" :key="event">
      <SingleEvent :event="event" />
    </div>
  </div>
</template>

<script>
import SingleEvent from "./SingleEvent.vue";
export default {
  props: ["event"],
  components: { SingleEvent },
  setup() {},
};
</script>

<style></style>
