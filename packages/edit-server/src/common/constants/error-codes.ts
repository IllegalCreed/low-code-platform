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
  RESEND_ACTIVATION_EMAIL_FAILED: {
    code: 6,
    msg: 'Failed to resend activation email due to an unexpected error.',
  },
  ALREADY_ACTIVATED: {
    code: 7,
    msg: 'The account is already activated.',
  },
  USER_NOT_FOUND: {
    code: 8,
    msg: 'No such user with the given email.',
  },
  // 可以根据需要添加更多错误码
};

export type ErrorCode = keyof typeof ErrorCodes;
