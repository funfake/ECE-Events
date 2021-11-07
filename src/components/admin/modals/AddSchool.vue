<template>
  <div class="add-school">
    <GenericModal title="Add new school" @handleUpdate="process" @cancelUpdate="close">
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
            <!-- COLOR -->
              <div class="col-span-2">
                <label class="text-primary" for="color">
                  Location
                <select class="block w-full text-primary py-2 px-3 my-2 border border-gray-300 bg-secondary rounded-md shadow-sm focusxoutline-none focus:ring-primary-500 focus:border-primary-500"
                        v-model="selId"
                        required
                        name="color">
                    <option value="">
                        Select a location
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