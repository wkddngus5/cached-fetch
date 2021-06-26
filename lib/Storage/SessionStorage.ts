import StoredItem from '../StoredItem';
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

  getItem(key: string): StoredItem {
    const stored = this.core.getItem(key);
    if (typeof stored !== 'string') {
      return null;
    }
    const storedItem = JSON.parse(stored);
    if (!storedItem.data || !storedItem.expiredAt) {
      return null;
    }
    return storedItem;
  }

  setItem(key: string, item: StoredItem) {
    this.core.setItem(key, JSON.stringify(item));
  }
}

export default SessionStorage;
