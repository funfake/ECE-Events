import { ref } from "vue";
import { projectFirestore } from "../firebase/config";
const getSchools = () => {
  const schools = ref([]);
  const schoolsError = ref(null);

  const loadSchools = async (locationId) => {
    try {
      projectFirestore
      .collection("locations")
      .doc(locationId)
      .collection("schools")
      .onSnapshot((querySnapshot) => {
        schools.value = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id, locationId: locationId };
        });
      });
    } catch (err) {
      schoolsError.value = err.message;
    }
  };

  return { schools, schoolsError, loadSchools };
};

export default getSchools;
