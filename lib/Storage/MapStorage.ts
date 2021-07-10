import cloneDeep from '../cloneDeep';
import StoredItem from '../StoredItem';
import Storage from './Storage';

class MapStorage extends Storage<Map<string, StoredItem>> {
  core: Map<string, StoredItem>;

  constructor() {
    super();
    this.core = new Map<string, StoredItem>();
  }

  getItem(key: string): StoredItem {
    const item = this.core.get(key);
    return item ? cloneDeep(item) : null;
  }

  setItem(key: string, item: StoredItem): void {
    this.core.set(key, cloneDeep(item));
  }

  removeItem(key: string) {
    this.core.delete(key);
  }
}

export default MapStorage;
