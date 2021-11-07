<template>
    <div class="locations-list" v-for="location in locations" :key="location">
      <SingleLocation :location="location" />
    </div>
</template>

<script>
import SingleLocation from "./SingleLocation";

export default {
  props: ["locations"],
  components: { SingleLocation },
  setup() {},
};
</script>