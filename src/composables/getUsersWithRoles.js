import { ref } from "vue";
import { projectFirestore } from "../firebase/config";
const getUsersWithRoles = () => {
  const users = ref([]);
  const error = ref(null);

  const load = async (email) => {
    try {
      projectFirestore
      .collection("roles")
      .where("email", "==", email)
      .onSnapshot((querySnapshot) => {
        users.value = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      });
    } catch (err) {
      error.value = err.message;
    }
  };

  return { users, error, load };
};

export default getUsersWithRoles;
