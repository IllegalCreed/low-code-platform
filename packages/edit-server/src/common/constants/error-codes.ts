export const ErrorCodes = {
  USERNAME_TAKEN: {
    code: 1,
    msg: 'Username is already taken.',
  },
  EMAIL_TAKEN: {
    code: 2,
    msg: 'Email is already taken.',
  },
  WEAK_PASSWORD: {
    code: 3,
    msg: 'Password does not meet strength requirements.',
  },
  INVALID_EMAIL_FORMAT: {
    code: 4,
    msg: 'Invalid email format.',
  },
  REGISTRATION_FAILED: {
    code: 5,
    msg: 'Registration failed due to unexpected error.',
  },
  // 可以根据需要添加更多错误码
};

export type ErrorCode = keyof typeof ErrorCodes;
