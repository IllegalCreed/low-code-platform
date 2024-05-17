<template>
    <header class="header">
        <div class="title">
            My Application
        </div>
        <div class="welcome">
            Welcome, 用户名
            <i-carbon-user-avatar class="icon" />
        </div>
    </header>
</template>

<script setup lang="ts">
// 如果需要从外部获取用户名，可以在这里处理
</script>

<style lang="scss" scoped>
.header {
    @apply flex justify-between items-center p-4;
    @apply bg-gray-800 text-white;
}

.title {
    @apply text-lg font-bold;
}

.welcome {
    @apply flex items-center;
}

.icon {
    @apply ml-2 text-lg; // 调整图标的大小和位置
}
</style>