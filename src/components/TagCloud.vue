<template>
  <div class="px-5 my-8 tag-cloud md:px-8 lg:px-10">
    <h3 class="text-xl font-semibold text-center text-secondary">Browse tags</h3>
    <div v-for="tag in tags" :key="tag">
      <router-link :to="{ name: 'Tag', params: { tag } }">
        #{{ tag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import useTags from "../composables/useTags";
export default {
  props: ["events"],
  setup(props) {
    const { tags } = useTags(props.events);

    return { tags };
  },
};
</script>

<style>
.tag-cloud div {
  display: inline-block;
  padding: 10px;
}
.tag-cloud a {
  color: #747171;
  text-decoration: none;
}
.tag-cloud a.router-link-active {
  color: #0084ff;
  font-weight: semibold;
}
</style>
