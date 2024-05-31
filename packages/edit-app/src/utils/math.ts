/**
 * 将输入值进行非线性映射，使结果斜率先高再低再高
 * @param value - 输入值（0到1之间）
 * @param targetMax - 目标最大值（默认值为0.5）
 * @returns 映射后的值
 */
export function nonlinearArcsinMapping(value: number, targetMax: number = 0.5): number {
  if (value < 0 || value > 1) {
    throw new Error('value must be between 0 and 1');
  }

  // 使用反正弦函数进行非线性映射
  const normalizedValue = (value - 0.5) * 2;  // 将 [0, 1] 映射到 [-1, 1]
  const arcsinValue = Math.asin(normalizedValue);  // 计算 arcsin
  const mappedValue = (arcsinValue + Math.PI / 2) / Math.PI * targetMax;  // 将 [-π/2, π/2] 映射到 [0, targetMax]

  return mappedValue;
}

/**
 * 将输入值进行非线性映射，使结果单调递增且曲率逐渐增加
 * @param value - 输入值（0到1之间）
 * @param exponent - 指数函数的参数，用于控制曲线的陡峭程度（默认值为2）
 * @param targetMax - 目标最大值（默认值为1）
 * @returns 映射后的值
 */
export function exponentialMapping(value: number, exponent: number = 2, targetMax: number = 0.5): number {
  if (value < 0 || value > 1) {
    throw new Error('value must be between 0 and 1');
  }

  // 使用指数函数进行非线性映射
  const expValue = Math.exp(exponent * value) - 1;
  const maxExpValue = Math.exp(exponent) - 1;  // 归一化因子
  const mappedValue = (expValue / maxExpValue) * targetMax;

  return mappedValue;
}