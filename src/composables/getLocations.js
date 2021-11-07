import { ref } from "vue";
import { projectFirestore } from "../firebase/config";
const getLocations = () => {
  const locations = ref([]);
  const locationsError = ref(null);

  const loadLocations = async () => {
    try {
      projectFirestore
      .collection("locations")
      .onSnapshot((querySnapshot) => {
        locations.value = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
      });

      // const res = await projectFirestore
      //   .collection("locations")
      //   .get();

      //   locations.value = res.docs.map((doc) => {
      //   return { ...doc.data(), id: doc.id };
      // });
    } catch (err) {
        locationsError.value = err.message;
    }
  };

  return { locations, locationsError, loadLocations };
};

export default getLocations;
