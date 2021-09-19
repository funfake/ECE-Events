<template>
  <div class="event-list p-3">
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
