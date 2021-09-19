<template>
  <div class="event m-4 shadow-md p-3">
    <router-link :to="{ name: 'Details', params: { id: event.id } }">
      <h3 class="text-3xl font-black my-2">{{ event.title }}</h3>
    </router-link>
    <p class=" my-3 mx-1 text-lg ">{{ snippet }}</p>
    <div class="flex flex-wrap">
      <span
        class="
      bg-blue-500
      text-white
       py-1 px-2
      my-1
      rounded-lg
      cursor-pointer
      mx-1
      "
        v-for="tag in event.tags"
        :key="tag"
      >
        #{{ tag }}
      </span>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  props: ["event"],
  setup(props) {
    const snippet = computed(() => {
      return props.event.body.substring(0, 130) + "...";
    });
    return { snippet };
  },
};
</script>

<style></style>
