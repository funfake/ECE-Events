<template>
  <div class="school-single">
    <div class="bg-secondary bg-secondary-hover text-primary rounded-lg cursor-pointer p-4" @click="showModal = true">
          <h2 class="text-lg font-semibold">
            {{ school.name }}
            <MicroButton text="Delete" color="red" @click="deleteSchool"/>
          </h2>
      </div>
      <GenericModal v-if="showModal" title="Modify school" @handleUpdate="process" @cancelUpdate="close">
            <div class="grid max-w-xl grid-cols-2 gap-3 m-auto">
                <div class="col-span-2">
                    <label class="text-primary text-left">Name</label>
                    <input  type="text" 
                            v-model="name"
                            required
                            id="event-form-title" 
                            class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 my-2 bg-secondary text-primary placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
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
