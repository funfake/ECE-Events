import { ref } from "vue";
import { projectFirestore } from "../firebase/config";
const getEvents = () => {
  const event = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      const res = await projectFirestore
        .collection("event")
        .orderBy("createdAt", "desc")
        .get();

      event.value = res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
    } catch (err) {
      error.value = err.message;
    }
  };

  return { event, error, load };
};

export default getEvents;
