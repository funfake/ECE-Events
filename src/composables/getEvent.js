import { ref } from "vue";
import { projectFirestore } from "../firebase/config";
const getEvent = (id) => {
  const event = ref(null);
  const error = ref(null);

  const load = async () => {
    try {
      projectFirestore
      .collection("event")
      .doc(id)
      .onSnapshot((doc) => {
        if (!doc.exists) {
          throw Error("Not found");
        }
        event.value = { ...doc.data(), id: doc.id };
      });
    } catch (err) {
      error.value = err.message;
    }
  };

  return { event, error, load };
};

export default getEvent;
