<template>
    <div class="micro-button inline" :class="'bg-' + color + '-500 dark:bg-' + color + '-600 hover:bg-' + color + '-600 dark:hover:bg-' + color + '-700 ml-2 px-2 py-1 text-base text-white rounded'">
        {{ text }}
    </div>
</template>

<script>
export default {
    name: "MicroButton",
    props: {
        color: String,
        text: String,
    },
    setup() {

    }
}
</script>