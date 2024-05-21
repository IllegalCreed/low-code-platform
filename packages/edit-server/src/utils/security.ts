import * as crypto from 'crypto';

export function hashPassword(
  password: string,
  callback: (err: NodeJS.ErrnoException | null, hash?: string) => void,
): void {
  const salt = crypto.randomBytes(16).toString('hex'); // 生成随机盐
  crypto.scrypt(password, salt, 64, (err, derivedKey) => {
    if (err) {
      callback(err);
    } else {
      // 返回盐和哈希的组合，通常使用 ':' 来分隔
      callback(null, `${salt}:${derivedKey.toString('hex')}`);
    }
  });
}

export function verifyPassword(
  password: string,
  hash: string,
  callback: (err: NodeJS.ErrnoException | null, isMatch?: boolean) => void,
): void {
  const [salt, key] = hash.split(':'); // 从存储的哈希中提取盐和密钥
  crypto.scrypt(password, salt, 64, (err, derivedKey) => {
    if (err) {
      callback(err);
    } else {
      // 比较生成的哈希与存储的哈希是否匹配
      callback(null, key === derivedKey.toString('hex'));
    }
  });
}
