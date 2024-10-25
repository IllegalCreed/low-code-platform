import * as crypto from 'crypto';

export function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex'); // 生成随机盐
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        resolve(`${salt}:${derivedKey.toString('hex')}`); // 返回盐和哈希的组合
      }
    });
  });
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(':'); // 从存储的哈希中提取盐和密钥
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) {
        reject(err);
      } else {
        // 比较生成的哈希与存储的哈希是否匹配
        resolve(key === derivedKey.toString('hex'));
      }
    });
  });
}
