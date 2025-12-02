/**
 * Error thrown by RatioLock operations
 */
export class RatioLockError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'RatioLockError'
  }
}
