<template>
    <div class="generic-modal">
        <teleport to="body">
        <!--Overlay Effect-->
        <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" @click="cancelUpdate"></div>
        <!-- Modal -->
        <div class="inset-center p-5 border dark:border-gray-500 w-full md:w-96 shadow-lg rounded-lg bg-primary">
            <div class="mt-3">
                <!-- TITLE -->
                <h3 class="text-xl leading-6 font-medium text-primary text-center">{{ title }}</h3>
                <!-- BODY -->
                <div class="mt-2 px-4 py-3">
                    <slot></slot>
                </div>
                <!-- BUTTONS -->
                <div class="items-center px-4 py-3">
                    <button
                        @click="handleUpdate"
                        class="px-4 py-2 mt-2 bg-green-500 dark:bg-green-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 dark:hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-400"
                    >
                        Save
                    </button>
                    <button
                        @click="cancelUpdate"
                        class="px-4 py-2 mt-2 bg-red-500 dark:bg-red-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-400"
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