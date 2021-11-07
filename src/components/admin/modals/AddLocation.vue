<template>
  <div class="add-location">
    <GenericModal title="Add new location" @handleUpdate="process" @cancelUpdate="close">
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