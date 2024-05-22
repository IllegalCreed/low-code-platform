import { ApiResponse } from '../interfaces/api-response.interface';
import { ErrorCodes, ErrorCode } from '../constants/error-codes';

export function createErrorResponse<T = any>(
  errorCode: ErrorCode,
  data?: T,
): ApiResponse<T> {
  const error = ErrorCodes[errorCode];
  return {
    code: error.code,
    msg: error.msg,
    data,
  };
}

export function createSuccessResponse<T = any>(
  data: T,
  msg?: string,
): ApiResponse<T> {
  return {
    code: 0,
    msg,
    data,
  };
}
