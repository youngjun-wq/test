/**
 * Web Crypto API utilities for Board Bangjeong Murder Mystery
 * Uses PBKDF2 (100,000 iterations of SHA-256) + AES-GCM 256-bit encryption.
 */

export interface EncryptedPayload {
  ciphertext: string; // Base64
  iv: string; // Base64
  salt: string; // Base64
}

function getSubtleCrypto(): SubtleCrypto {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    return window.crypto.subtle;
  }
  if (typeof globalThis !== 'undefined' && globalThis.crypto && globalThis.crypto.subtle) {
    return globalThis.crypto.subtle;
  }
  throw new Error('Web Crypto API is not supported in this environment.');
}

export function bufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function base64ToBuffer(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Derives an AES-GCM 256-bit key from a plaintext password using PBKDF2.
 */
async function deriveKey(password: string, salt: Uint8Array, usages: KeyUsage[]): Promise<CryptoKey> {
  const subtle = getSubtleCrypto();
  const enc = new TextEncoder();
  const passwordKey = await subtle.importKey(
    'raw',
    enc.encode(password.normalize('NFKC').trim()),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as unknown as BufferSource,
      iterations: 100000,
      hash: 'SHA-256',
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    usages
  );
}

/**
 * Encrypts a plaintext string with a password using AES-GCM with a random salt & IV.
 */
export async function encryptAESGCM(plaintext: string, secretKeyStr: string): Promise<EncryptedPayload> {
  const subtle = getSubtleCrypto();
  const enc = new TextEncoder();

  const salt = new Uint8Array(16);
  crypto.getRandomValues(salt as any);

  const iv = new Uint8Array(12); // Standard 96-bit IV for AES-GCM
  crypto.getRandomValues(iv as any);

  const key = await deriveKey(secretKeyStr, salt, ['encrypt']);
  const encodedPlaintext = enc.encode(plaintext);

  const cipherBuffer = await subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv as unknown as BufferSource,
    },
    key,
    encodedPlaintext
  );

  return {
    ciphertext: bufferToBase64(cipherBuffer),
    iv: bufferToBase64(iv),
    salt: bufferToBase64(salt),
  };
}

/**
 * Decrypts an AES-GCM encrypted payload using the password.
 * Throws an Error if password/key is incorrect or data was tampered with.
 */
export async function decryptAESGCM(payload: EncryptedPayload, secretKeyStr: string): Promise<string> {
  const subtle = getSubtleCrypto();
  const dec = new TextDecoder();

  const salt = base64ToBuffer(payload.salt);
  const iv = base64ToBuffer(payload.iv);
  const ciphertext = base64ToBuffer(payload.ciphertext);

  const key = await deriveKey(secretKeyStr, salt, ['decrypt']);

  try {
    const decryptedBuffer = await subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv as unknown as BufferSource,
      },
      key,
      ciphertext as unknown as BufferSource
    );
    return dec.decode(decryptedBuffer);
  } catch {
    throw new Error('비밀번호가 일치하지 않거나 암호문이 훼손되었습니다.');
  }
}

/**
 * Password hash for admin verification using PBKDF2-HMAC-SHA256
 */
export async function hashPassword(password: string, existingSaltBase64?: string): Promise<{ hash: string; salt: string }> {
  const subtle = getSubtleCrypto();
  const enc = new TextEncoder();

  let salt: Uint8Array;
  if (existingSaltBase64) {
    salt = base64ToBuffer(existingSaltBase64);
  } else {
    salt = new Uint8Array(16);
    crypto.getRandomValues(salt as any);
  }

  const passwordKey = await subtle.importKey(
    'raw',
    enc.encode(password.normalize('NFKC').trim()),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );

  const hashBits = await subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt as unknown as BufferSource,
      iterations: 100000,
      hash: 'SHA-256',
    },
    passwordKey,
    256
  );

  return {
    hash: bufferToBase64(hashBits),
    salt: bufferToBase64(salt),
  };
}

/**
 * Verifies a password against stored hash & salt
 */
export async function verifyPassword(password: string, expectedHash: string, saltBase64: string): Promise<boolean> {
  const result = await hashPassword(password, saltBase64);
  return result.hash === expectedHash;
}
