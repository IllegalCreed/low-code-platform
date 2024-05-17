import { defineStore } from 'pinia';
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { getRandomColor } from '@/utils/color'; // 引入新的 getRandomColor 函数

export const useAppsStore = defineStore('apps', () => {
    const apps = ref([
        { id: uuidv4(), name: 'Application One with a significantly longer name', color: getRandomColor() },
        { id: uuidv4(), name: 'Short name', color: getRandomColor() },
        { id: uuidv4(), name: 'Data Analyzer with additional descriptive text', color: getRandomColor() },
        { id: uuidv4(), name: 'Task Scheduler and Event Manager', color: getRandomColor() },
        { id: uuidv4(), name: 'User Management System', color: getRandomColor() },
        { id: uuidv4(), name: 'Content Delivery Network and Services Platform', color: getRandomColor() },
        { id: uuidv4(), name: 'Advanced Configuration and Setup Tool for Network Devices', color: getRandomColor() },
    ]);

    function getList() {
        return apps;
    }

    return { apps, getList };
});
