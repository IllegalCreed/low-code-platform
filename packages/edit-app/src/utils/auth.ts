import { useLocalStorage, type RemovableRef } from '@vueuse/core';
import { ElMessageBox } from 'element-plus';
import router from '@/router';

// 使用 VueUse 的 useLocalStorage 来管理本地存储中的 token
export const token: RemovableRef<string> = useLocalStorage('token', '');

/**
 * 清除 token 并重定向到登录页面
 * @function reset
 */
export const reset = () => {
  token.value = ''; // 清空 token
  router.replace('/login'); // 重定向到登录页面
};

// 防止重复弹窗
let isReloginShow = false;

/**
 * 处理重新登录逻辑
 * @function relogin
 */
export const relogin = () => {
  if (!isReloginShow) {
    isReloginShow = true;
    ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        isReloginShow = false;
        reset();
      })
      .catch(() => {
        isReloginShow = false;
      });
  }
};
