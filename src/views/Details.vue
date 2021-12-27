<template>
  <div class="px-2 details">
    <div v-if="error">{{ error }}</div>
    <div v-if="event" class="w-full mx-auto mt-10 rounded-lg shadow-md text-primary bg-secondary md:w-96 rounded-2xl">
        <div :class="'bg-' + 'event.color' + '-200 h-48 p-3 rounded-t-lg bg-cover bg-center overflow-hidden' + (event.img_url == '' ? 'animate-pulse' : '') "
              :style="'background-image: url(' + event.img_url + ')'">
        </div>
        <div class="px-6 py-3 h-">
            <div class="my-2 grid grid-cols-5 gap-3">
              <div class="py-3 col-span-5">
                <h3 class="mb-0 text-3xl text-primary">{{ event.title }}</h3>
              </div>
              <div class="px-2 py-1 bg-blue-200 rounded col-span-2 dark:bg-blue-500">
                <p class="font-semibold text-center">{{ event.time.hours }}:{{ event.time.minutes }}</p>
              </div>
              <div class="px-2 py-1 bg-green-200 rounded col-span-3 dark:bg-green-500">
                <p class="font-semibold text-center">{{ event.date[0] }}</p>
              </div>
              <div :class="'col-span-5 py-1 px-2 bg-'+ event.color +'-200 dark:bg-'+ event.color +'-500 rounded'">
                <p class="font-semibold text-center">{{ event.location.placename }}</p>
              </div>
              <div class="px-2 py-1 bg-gray-200 rounded col-span-5 dark:bg-gray-500">
                <p class="text-center">{{ event.location.address }}</p>
              </div>
              <div class="px-2 py-1 bg-gray-200 rounded col-span-3 dark:bg-gray-500">
                <p class="text-center">{{ event.location.city }}</p>
              </div>
              <div class="px-2 py-1 bg-gray-200 rounded col-span-2 dark:bg-gray-500">
                <p class="text-center">{{ event.location.zip }}</p>
              </div>
              <div v-if="event.location.notes" class="px-2 py-1 bg-yellow-200 rounded col-span-5 dark:bg-yellow-500">
                <p class="text-center">Notes: {{ event.location.address }}</p>
              </div>
              <div class="py-2 col-span-5">
                <p class="pre">{{ event.body }}</p>
              </div>
            </div>
            <div class="py-3" v-if="user.data && user.data.uid === event.authorId">
              <button
                @click="handleClick"
                class="w-32 py-2 mx-auto font-semibold text-white bg-red-500 transition duration-200 ease-in-out focus:outline-none rounded-md hover:text-red-600 hover:bg-red-300 ring-4 ring-red-500 ring-opacity-50 hover:ring-opacity-25"
              >
                Delete
              </button>
              <!-- <button
                class="px-3 py-2 m-2 font-semibold text-green-600  ring ring-green-100
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
