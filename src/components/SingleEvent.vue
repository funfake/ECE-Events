<template>
  <router-link :to="{ name: 'Details', params: { id: event.id } }">
  <div :class="'bg-cover bg-center bg-secondary event ring-4 rounded-lg text-primary shadow-md p-4 ring-' + [event.color] + '-300 dark:ring-' + [event.color] + '-400'"
       :style="'background-image: url(' + event.img_url + ')'">
    <div class="grid grid-flow-col auto-cols-max gap-4">
      <div class="">
        <div class="flex flex-col flex-wrap">
          <div
            class="m-1"
            v-for="tag in event.tags"
            :key="tag"
          >
            <span :class="'py-1 px-2 my-1 rounded-lg cursor-pointer mx-1 bg-' + [event.color] + '-300'">#{{ tag.substring(0, 8) }}</span>
          </div>
        </div>
      </div>
      <div class="">
        <h3 class="text-2xl font-semibold py-4 mb-1"><span class="bg-white bg-opacity-80 dark:bg-gray-700 px-3 pt-1 pb-2 rounded-lg">{{ event.title }}</span></h3>
        <p class="mb-3 mx-1 text-md "><span class="bg-white bg-opacity-60 dark:bg-gray-700 px-3 py-1 rounded-lg">{{ snippet }}</span></p>
      </div>
    </div>
  </div>
  </router-link>
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
