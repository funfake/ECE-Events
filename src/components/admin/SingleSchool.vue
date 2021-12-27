<template>
  <div class="school-single">
    <div class="p-4 rounded-lg cursor-pointer bg-secondary bg-secondary-hover text-primary" @click="showModal = true">
          <h2 class="text-lg font-semibold">
            {{ school.name }}
            <MicroButton text="Delete" color="red" @click="deleteSchool"/>
          </h2>
      </div>
      <GenericModal v-if="showModal" title="Modify school" @handleUpdate="process" @cancelUpdate="close">
            <div class="max-w-xl m-auto grid grid-cols-2 gap-3">
                <div class="col-span-2">
                    <label class="text-left text-primary">Name</label>
                    <input  type="text" 
                            v-model="name"
                            required
                            id="event-form-title" 
                            class="flex-1 w-full px-4 py-2 my-2 text-base placeholder-gray-400 border border-transparent border-gray-300 rounded-lg appearance-none bg-secondary text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                            placeholder="Name of the school"/>
                </div>
            </div>
      </GenericModal>
    </div>
</template>

<script>
import GenericModal from "@/components/admin/modals/GenericModal"
import MicroButton from "@/components/MicroButton"
import { projectFirestore } from "@/firebase/config";
import { ref } from "vue";

export default {
  props: ["school"],
  components: {
    GenericModal,
    MicroButton
  },
  setup(props) {
    const showModal = ref(false);
    const name = ref(props.school.name);
    
    const process = async () => {
        if(name.value != "") {
            projectFirestore.collection("locations").doc(props.school.locationId).collection("schools").doc(props.school.id).set({
                name: name.value,
            })
            .then(() => {
                console.log("Document successfully written!");
                close();
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
        } else{
            console.log("error: nothing was entered");
        }
    };   
    const close = () => {
        showModal.value = false;
    };

    const deleteSchool = async () => {
      showModal.value = false;
      projectFirestore.collection("locations").doc(props.school.locationId).collection("schools").doc(props.school.id).delete()
      .then(() => {
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }

    return { process, close, deleteSchool, showModal, name }; 
  }
};
</script>
