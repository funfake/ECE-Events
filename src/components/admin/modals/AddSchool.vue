<template>
  <div class="add-school">
    <GenericModal title="Add new school" @handleUpdate="process" @cancelUpdate="close">
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
            <!-- CAMPUS LOCATION -->
            <div class="col-span-2">
                <label class="text-primary" for="color">
                  Location
                <select class="block w-full px-3 py-2 my-2 border border-gray-300 text-primary bg-secondary rounded-md shadow-sm focusxoutline-none focus:ring-primary-500 focus:border-primary-500"
                        v-model="selId"
                        required
                        name="color">
                    <option value="">
                        Select a campus
                    </option>
                    <option v-for="location in locations" :key="location.id" :value="location.id">
                        {{ location.name }}
                    </option>
                </select>
                </label>
            </div>
        </div>
    </GenericModal>
  </div>
</template>

<script>
import GenericModal from "@/components/admin/modals/GenericModal"
import { projectFirestore} from "@/firebase/config";
import { ref } from "vue";

export default {
    components: {
        GenericModal
    },
    props: [
        "locations"
    ],
    setup(props, { emit }) {
        const name = ref("");
        const selId =ref("");
        const process = async () => {
            if(selId.value !="") {
                if(name.value != "") {
                    const school = {
                        name: name.value,
                    };
                    const res = await projectFirestore.collection("locations").doc(selId.value).collection("schools").add(school).then(close());
                } else{
                    console.log("error: nothing was entered");
                }
            } else {
                console.log("error: no location was selected");
            }
            
        };   
        const close = () => {
            emit("closeModal");
        };
    return { process, close, selId, name }; 
    }
}
</script>

<style>

</style>