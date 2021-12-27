<template>
  <div class="add-location">
    <GenericModal title="Add new campus location" @handleUpdate="process" @cancelUpdate="close">
        <div class="max-w-xl m-auto grid grid-cols-2 gap-3">
            <div class="col-span-2">
                <label class="text-left text-primary">Name</label>
                <input  type="text" 
                        v-model="name"
                        required
                        id="event-form-title" 
                        class="flex-1 w-full px-4 py-2 my-2 text-base placeholder-gray-400 border border-transparent border-gray-300 rounded-lg appearance-none bg-secondary text-primary shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" 
                        placeholder="Name of the location"/>
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
    setup(props, { emit }) {
        const name = ref("");
        const process = async () => {
            if(name.value != "") {
                const location = {
                    name: name.value,
                };
                const res = await projectFirestore.collection("locations").add(location).then(close());
            } else{
                console.log("error: nothing was entered");
            }
        };   
        const close = () => {
            emit("closeModal");
        };
    return { process, close, name }; 
    }
}
</script>

<style>

</style>