<template>
    <el-container class="app-view">
        <el-aside class="aside">
            <el-menu :default-active="activeIndex" class="menu-vertical" @select="handleMenuSelect">
                <el-menu-item index="dashboard">
                    <i-ic:round-dashboard></i-ic:round-dashboard>
                    <span>仪表板</span>
                </el-menu-item>
                <el-menu-item index="data">
                    <i-material-symbols:database></i-material-symbols:database>
                    <span>数据</span>
                </el-menu-item>
                <el-menu-item index="storage">
                    <i-material-symbols:storage-rounded></i-material-symbols:storage-rounded>
                    <span>存储</span>
                </el-menu-item>
                <el-sub-menu index="api">
                    <template #title>
                        <i-icon-park-solid:api></i-icon-park-solid:api>
                        <span>API</span>
                    </template>
                    <el-menu-item index="internal">
                        <i-ic:round-api></i-ic:round-api>
                        <span>内部</span>
                    </el-menu-item>
                    <el-menu-item index="external">
                        <i-dashicons:rest-api></i-dashicons:rest-api>
                        <span>外部</span>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item index="page">
                    <i-mingcute:layout-fill></i-mingcute:layout-fill>
                    <span>页面</span>
                </el-menu-item>
                <el-menu-item index="localization">
                    <i-ic:sharp-language></i-ic:sharp-language>
                    <span>本地化</span>
                </el-menu-item>
                <el-menu-item index="flow">
                    <i-fluent:flow-32-filled></i-fluent:flow-32-filled>
                    <span>流程</span>
                </el-menu-item>
                <el-sub-menu index="file">
                    <template #title>
                        <i-mdi:file></i-mdi:file>
                        <span>文件</span>
                    </template>
                    <el-menu-item index="import">
                        <i-flowbite:file-import-solid></i-flowbite:file-import-solid>
                        <span>导入</span>
                    </el-menu-item>
                    <el-menu-item index="export">
                        <i-flowbite:file-export-solid></i-flowbite:file-export-solid>
                        <span>导出</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-main>
                <router-view />
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang='ts'>
import { useMenuSelect } from '@/composables/route'

const { activeIndex, handleMenuSelect } = useMenuSelect('dashboard', onNaviagtionBlocked);

function onNaviagtionBlocked(name: string) {
    console.log(name);
    
    switch (name) {
        case 'data':
            break;
        case 'internal':
            break;
        case 'external':
            break;
        case 'page':
            break;
        case 'flow':
            break;
        case 'import':
            break;
        case 'export':
            break;
        default:
    }
}
</script>

<style scoped lang="scss">
.app-view {
    @apply h-full;

    .aside {
        @apply w-50;

        .menu-vertical {
            @apply h-full;

            svg {
                @apply w-6 h-6 mr-6;
            }
        }
    }
}
</style>