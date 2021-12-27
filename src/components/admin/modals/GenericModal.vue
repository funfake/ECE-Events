<template>
    <div class="generic-modal">
        <teleport to="body">
        <!--Overlay Effect-->
        <div class="fixed inset-0 w-full h-full overflow-y-auto bg-gray-600 bg-opacity-50" @click="cancelUpdate"></div>
        <!-- Modal -->
        <div class="w-full p-5 border rounded-lg shadow-lg inset-center dark:border-gray-500 md:w-96 bg-primary">
            <div class="mt-3">
                <!-- TITLE -->
                <h3 class="text-xl font-medium text-center leading-6 text-primary">{{ title }}</h3>
                <!-- BODY -->
                <div class="px-4 py-3 mt-2">
                    <slot></slot>
                </div>
                <!-- BUTTONS -->
                <div class="items-center px-4 py-3">
                    <button
                        @click="handleUpdate"
                        class="w-full px-4 py-2 mt-2 text-base font-medium text-white bg-green-500 dark:bg-green-600 rounded-md shadow-sm hover:bg-green-600 dark:hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-400"
                    >
                        Save
                    </button>
                    <button
                        @click="cancelUpdate"
                        class="w-full px-4 py-2 mt-2 text-base font-medium text-white bg-red-500 dark:bg-red-600 rounded-md shadow-sm hover:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
        </teleport>
    </div>
</template>

<script>
export default {
    props: [
        'title',
    ],
    setup(props, { emit }) {
        const handleUpdate = () => {
            emit("handleUpdate");
        };

        const cancelUpdate = () => {
            emit("cancelUpdate");
        };

        return { handleUpdate, cancelUpdate };
  },
}
</script>

<style>
.inset-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>