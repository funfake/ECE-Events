<template>
    <div class="users-list" v-for="user in users" :key="user">
      <SingleUser :user="user" />
    </div>
</template>

<script>
import SingleUser from "./SingleUser";

export default {
  props: ["users"],
  components: { SingleUser },
  setup() {},
};
</script>

<style></style>
