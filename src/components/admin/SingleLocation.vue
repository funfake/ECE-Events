<template>
  <div class="single-location">
    <div v-if="schoolsError">{{ schoolsError }}</div>

    <div class="location-single bg-secondary bg-secondary-hover text-primary rounded-lg cursor-pointer p-4" @click="showModal = true">
        <h2 class="text-lg font-semibold">
          {{ location.name }}
          <MicroButton text="Delete" color="red" @click="deleteLocation"/>
        </h2>
    </div>
    <div v-if="schools.length" class="grid grid-cols-1 gap-4 mx-3 px-5 md:px-8 lg:px-10 mx-auto mt-4 w-full max-w-2xl">
          <SchoolsList :schools="schools" />
    </div>

    <GenericModal v-if="showModal" title="Modify location" @handleUpdate="process" @cancelUpdate="close">
          <div class="grid max-w-xl grid-cols-2 gap-3 m-auto">
              <div class="col-span-2">
                  <label class="text-primary text-left">Name</label>
                  <input  type="text" 
                          v-model="name"
                          required
                          id="event-form-title" 
                          class="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 my-2 bg-secondary text-primary placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                          placeholder="Name of the location"/>
              </div>
          </div>
      </GenericModal>
  </div>
</template>

<script>
import GenericModal from "@/components/admin/modals/GenericModal"
import MicroButton from "@/components/MicroButton"
import getSchools from "@/composables/getSchools";
import SchoolsList from "@/components/admin/SchoolsList";
import { projectFirestore } from "@/firebase/config";
import { ref } from "vue";

export default {
  props: ["location"],
  components : {
    GenericModal,
    SchoolsList,
    MicroButton
  },
  setup(props) {
    const showModal = ref(false);
    const name = ref(props.location.name);
     
    // SCHOOLS at this location
    const { schools, schoolsError, loadSchools } = getSchools();
    loadSchools(props.location.id);
    
    const process = async () => {
        if(name.value != "") {
            projectFirestore.collection("locations").doc(props.location.id).set({
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

    const deleteLocation = async () => {
      showModal.value = false;
      projectFirestore.collection("locations").doc(props.location.id).delete()
      .then(() => {
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }

    return { process, close, deleteLocation, showModal, name, schools, schoolsError }; 
  },
};
</script>
