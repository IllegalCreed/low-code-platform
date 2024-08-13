/**
 * 一个用于缓存验证结果以优化性能的自定义 Vue 钩子。
 * @returns {object} 钩子提供的方法。
 */
export function useValidateCatch() {
  const validateCache = new Map<string, any>()

  /**
   * 检查给定键的缓存值是否已经存在并与当前值匹配，如果不匹配，则执行验证函数。
   * @param {T} value - 需要验证的值。
   * @param {string} key - 用于缓存的键。
   * @param {() => Promise<boolean> | boolean} func - 执行的验证函数。
   * @returns {Promise<boolean>} 验证的结果。
   */
  async function checkCatch<T>(
    value: T,
    key: string,
    func: () => Promise<boolean> | boolean
  ): Promise<boolean> {
    if (value && validateCache.get(key) !== value) {
      validateCache.set(key, value)
      return func()
    }
    // TODO: 不应该直接return true，应该返回上次一验证结果
    return true
  }

  // 当组件卸载时清理缓存
  onUnmounted(() => {
    validateCache.clear()
  })

  return { checkCatch }
}
