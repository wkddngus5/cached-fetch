import cloneDeep from '../cloneDeep';
import CachedItem from '../CachedItem';
import Storage from './Storage';

class MapStorage extends Storage<Map<string, CachedItem>> {
  core: Map<string, CachedItem>;

  constructor() {
    super();
    this.core = new Map<string, CachedItem>();
  }

  getItem(key: string): CachedItem {
    const item = this.core.get(key);
    return item ? cloneDeep(item) : null;
  }

  setItem(key: string, item: CachedItem): void {
    this.core.set(key, cloneDeep(item));
  }

  removeItem(key: string) {
    this.core.delete(key);
  }
}

export default MapStorage;
