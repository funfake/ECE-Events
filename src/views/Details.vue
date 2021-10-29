<template>
  <div class="details">
    <div v-if="error">{{ error }}</div>
    <div v-if="event" class="text-primary p-4 bg-secondary rounded-lg px-5 md:px-8 lg:px-10 mx-5 lg:mx-8 xl:mx-10 mt-10 text-center">
      
      <h3 class="pt-2 mb-0 text-3xl text-primary">{{ event.title }}</h3>
      
      <h5 class="pb-2 pt-1 text-secondary">
        Organised by:
        <span class="text-purple-500 dark:text-purple-300
                    hover:text-purple-600 dark:hover:text-purple-400
                    cursor-pointer">
          {{ event.displayName }} 
          </span>
      </h5>

      <hr class="my-2">

      <p class="pre py-2">{{ event.body }}</p>

      <div class="py-3" v-if="user.data && user.data.uid === event.authorId">
        <button
          @click="handleClick"
          class="transition duration-200 ease-in-out focus:outline-none w-32 py-2 rounded-md font-semibold text-white hover:text-red-600 bg-red-500 hover:bg-red-300 ring-4 ring-red-500 ring-opacity-50 hover:ring-opacity-25"
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
