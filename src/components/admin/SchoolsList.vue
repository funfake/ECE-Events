<template>
    <div class="schools-list" v-for="school in schools" :key="school">
      <SingleSchool :school="school" />
    </div>
</template>

<script>
import SingleSchool from "./SingleSchool";

export default {
  props: ["schools"],
  components: { SingleSchool },
  setup() {},
};
</script>