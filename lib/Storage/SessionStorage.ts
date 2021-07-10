import CachedItem from '../CachedItem';
import Storage from './Storage';

class SessionStorage extends Storage {
  core: globalThis.Storage;

  constructor() {
    super();
    if (!sessionStorage) {
      throw new Error('sessionStorage not exists.');
    }
    this.core = sessionStorage;
  }

  getItem(key: string): CachedItem {
    const cached = this.core.getItem(key);
    if (typeof cached !== 'string') {
      return null;
    }
    const cachedItem = JSON.parse(cached);
    if (!cachedItem.data || !cachedItem.expiredAt) {
      return null;
    }
    return cachedItem;
  }

  setItem(key: string, item: CachedItem) {
    this.core.setItem(key, JSON.stringify(item));
  }

  removeItem(key: string) {
    this.core.removeItem(key);
  }
}

export default SessionStorage;
