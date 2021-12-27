<template>
  <div class="p-4 rounded-lg cursor-pointer single-user bg-secondary text-primary">
        <h2 class="pb-3 text-lg font-semibold">{{ user.email }}</h2>

        <select @change="changeRole(user.id, $event)" 
                class="block px-3 py-2 border border-gray-300 w-52 bg-primary text-primary rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="role">
            <option :selected="user.role.member" value="member">
                Member
            </option>
            <option :selected="user.role.staff" value="staff">
                Staff
            </option>
            <option :selected="user.role.admin" value="admin">
                Admin
            </option>
        </select>
  </div>
</template>

<script>
import { projectFunctions } from "@/firebase/config";

export default {
  props: ["user"],
  setup(props) {
    const changeRole = (uid, event) => {
        var addMessage = projectFunctions.httpsCallable("setUserRole");

        var data = { uid: uid, role: event.target.value };

        addMessage(data)
            .then(function(result) {
                console.log(result);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

    return { changeRole };
  },
};
</script>
