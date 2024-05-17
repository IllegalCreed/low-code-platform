<template>
    <div class="app-card" @click="goApp">
        <div class="app-icon" :style="{ backgroundColor: app.color }">
            {{ app.name[0].toUpperCase() }}
        </div>
        <h3 class="app-name" :title="app.name">{{ app.name }}</h3>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const router = useRouter();

const props = defineProps({
    app: Object
});

function goApp() {
    router.push({ name: 'app', params: { id: props.app.id } });
}


</script>

<style lang="scss" scoped>
.app-card {
    @apply p-4 m-2 bg-white shadow-md rounded-lg flex flex-col items-center w-40 cursor-pointer; // 使用 items-center 使内容水平居中

    .app-icon {
        @apply flex items-center justify-center w-10 h-10 rounded-full text-white text-xl font-bold mb-2;
    }

    .app-name {
        @apply text-sm line-clamp-2 w-full text-center;
    }
}
</style>
