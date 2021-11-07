<template>
  <div class="details px-2">
    <div v-if="error">{{ error }}</div>
    <div v-if="event" class="text-primary bg-secondary rounded-lg w-full md:w-96 mx-auto mt-10 rounded-2xl shadow-md">
        <div :class="'bg-' + 'event.color' + '-200 h-48 p-3 rounded-t-lg bg-cover bg-center overflow-hidden' + (event.img_url == '' ? 'animate-pulse' : '') "
              :style="'background-image: url(' + event.img_url + ')'">
        </div>
        <div class="h- py-3 px-6">
            <div class="grid grid-cols-5 gap-3 my-2">
              <div class="col-span-5 py-3">
                <h3 class="mb-0 text-3xl text-primary">{{ event.title }}</h3>
              </div>
              <div class="col-span-2 py-1 px-2 bg-blue-200 dark:bg-blue-500 rounded">
                <p class="font-semibold text-center">{{ event.time.hours }}:{{ event.time.minutes }}</p>
              </div>
              <div class="col-span-3 py-1 px-2 bg-green-200 dark:bg-green-500 rounded">
                <p class="font-semibold text-center">{{ event.date[0] }}</p>
              </div>
              <div :class="'col-span-5 py-1 px-2 bg-'+ event.color +'-200 dark:bg-'+ event.color +'-500 rounded'">
                <p class="font-semibold text-center">{{ event.location.placename }}</p>
              </div>
              <div class="col-span-5 py-1 px-2 bg-gray-200 dark:bg-gray-500 rounded">
                <p class="text-center">{{ event.location.address }}</p>
              </div>
              <div class="col-span-3 py-1 px-2 bg-gray-200 dark:bg-gray-500 rounded">
                <p class="text-center">{{ event.location.city }}</p>
              </div>
              <div class="col-span-2 py-1 px-2 bg-gray-200 dark:bg-gray-500 rounded">
                <p class="text-center">{{ event.location.zip }}</p>
              </div>
              <div v-if="event.location.notes" class="col-span-5 py-1 px-2 bg-yellow-200 dark:bg-yellow-500 rounded">
                <p class="text-center">Notes: {{ event.location.address }}</p>
              </div>
              <div class="col-span-5 py-2">
                <p class="pre">{{ event.body }}</p>
              </div>
            </div>
            <div class="py-3" v-if="user.data && user.data.uid === event.authorId">
              <button
                @click="handleClick"
                class="mx-auto transition duration-200 ease-in-out focus:outline-none w-32 py-2 rounded-md font-semibold text-white hover:text-red-600 bg-red-500 hover:bg-red-300 ring-4 ring-red-500 ring-opacity-50 hover:ring-opacity-25"
              >
                Delete
              </button>
              <!-- <button
                class="px-3 py-2 font-semibold  text-green-600 ring m-2 ring-green-100
              hover:bg-green-600 hover:text-white
              "
              >
                Edit
              </button> -->
            </div>
        </div>
    </div>
    <div v-else><Spinner /></div>
  </div>
</template>

<script>
import getEvent from "@/composables/getEvent";
import Spinner from "@/components/Spinner";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { projectFirestore } from "@/firebase/config";
export default {
  components: {
    Spinner,
  },
  props: ["id"],
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const user = computed(() => store.state.user);
    const { error, event, load } = getEvent(route.params.id);
    load();
    const handleClick = async () => {
      await projectFirestore
        .collection("event")
        .doc(props.id)
        .delete();
      load();
      router.push("/");
    };
    return { error, event, handleClick, user };
  },
};
</script>

<style scoped>

.pre {
  white-space: pre-wrap;
}
</style>
