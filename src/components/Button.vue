<template>
    <div class="button">
        <button type="button" :class="'py-2 px-4 flex justify-center items-center  bg-' + color + '-600 hover:bg-' + color + '-700 focus:ring-' + color + '-500 focus:ring-offset-' + color + '-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg'">
            <svg v-if="icon" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
               <path fill-rule="evenodd" :d="iconPath" clip-rule="evenodd" />
            </svg>
            {{ text }}
        </button>
    </div>
</template>

<script>
export default {
    name: "Button",
    props: {
        color: String,
        text: String,
        icon: Boolean,
        iconPath: String
    }
}
</script>