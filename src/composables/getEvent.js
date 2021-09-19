import { ref } from "vue";
import { projectFirestore } from "../firebase/config";
const getEvent = (id) => {
  const event = ref(null);
  const error = ref(null);

  const load = async () => {
    try {
      let res = await projectFirestore
        .collection("event")
        .doc(id)
        .get();

      if (!res.exists) {
        throw Error("Not found");
      }
      event.value = { ...res.data(), id: res.id };
    } catch (err) {
      error.value = err.message;
    }
  };

  return { event, error, load };
};

export default getEvent;
