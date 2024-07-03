import { switchClass } from '@/composables/darkmode'

describe('switchClass function', () => {
  let originalClassName: string

  beforeEach(() => {
    // 存储原始类名以便恢复和比较
    originalClassName = document.documentElement.className
  })

  afterEach(() => {
    // 恢复初始状态
    document.documentElement.className = originalClassName
  })

  it('temporarily adds "dark" class when isDarkMode is true', () => {
    const mockCallback = vi.fn(() => {
      // 在回调中检查类名是否已经包含'dark'
      expect(document.documentElement.className).toContain('dark')
      // 确保这时还没有恢复原始类名
      expect(document.documentElement.className).not.toBe(originalClassName)
    })

    switchClass(true, mockCallback)

    // 检查回调函数是否被调用
    expect(mockCallback).toHaveBeenCalled()
    // 检查类名是否恢复到原始状态
    expect(document.documentElement.className).toBe(originalClassName)
  })

  it('temporarily removes "dark" class when isDarkMode is false', () => {
    // 先设定初始状态包含'dark'
    document.documentElement.className = 'someClass dark'

    const mockCallback = vi.fn(() => {
      // 在回调中检查'dark'类名是否已经被移除
      expect(document.documentElement.className).not.toContain('dark')
      // 确保这时还没有恢复原始类名
      expect(document.documentElement.className).toBe('someClass')
    })

    switchClass(false, mockCallback)

    // 检查回调函数是否被调用
    expect(mockCallback).toHaveBeenCalled()
    // 检查类名是否恢复到包含'dark'
    expect(document.documentElement.className).toBe('someClass dark')
  })
})
