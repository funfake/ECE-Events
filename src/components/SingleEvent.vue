<template>
  <router-link :to="{ name: 'Details', params: { id: event.id } }">
  <div :class="'bg-cover bg-center bg-secondary event ring-4 rounded-lg text-primary shadow-md p-4 ring-' + [event.color] + '-300 dark:ring-' + [event.color] + '-400'"
       :style="'background-image: url(' + event.img_url + ')'">
    <div class="grid grid-cols-1 gap-4">
      <div class="">
        <div class="flex flex-wrap">
          <div
            class="mr-1"
            v-for="tag in event.tags"
            :key="tag"
          >
            <span :class="'py-1 px-2 my-1 rounded-lg cursor-pointer mx-1 bg-' + [event.color] + '-300 dark:bg-' + [event.color] + '-500'">#{{ tag.substring(0, 8) }}</span>
          </div>
        </div>
      </div>
      <div class="">
        <h3 v-if="event.title.length < 15" class="py-4 mb-1 text-2xl font-semibold"><span class="px-3 pt-1 pb-2 bg-white rounded-lg bg-opacity-80 dark:bg-gray-700">{{ event.title }}</span></h3>
        <h3 v-else class="px-3 py-4 pt-1 pb-2 mb-1 text-2xl font-semibold bg-white rounded-lg bg-opacity-80 dark:bg-gray-700">{{ event.title }}</h3>
        <p class="mb-3 mr-1 text-md "><span class="px-3 py-1 bg-white bg-opacity-60 dark:bg-gray-700 rounded-md">{{ snippet }}</span></p>
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
      if (props.event.body.length > 30) {
      return props.event.body.substring(0, 30) + "...";
      } else {
        return props.event.body;
      }
    });
    return { snippet };
  },
};
</script>

<style></style>
