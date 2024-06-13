/**
 * 参数处理
 * @param {Object} params 参数
 * @returns {string} 处理后的参数字符串
 */
export function tansParams(params: Record<string, any>): string {
    const buildParams = (key: string, value: any): string => {
      let result = '';
  
      if (value !== null && value !== '' && typeof value !== 'undefined') {
        if (typeof value === 'object') {
          result += `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}&`;
        } else {
          result += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
        }
      }
      return result;
    };
  
    return Object.keys(params)
      .map((key) => buildParams(key, params[key]))
      .join('')
      .slice(0, -1); // 去掉最后的 '&'
  }
  