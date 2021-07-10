import Fetcher, { FetchParam } from './Fetcher/Fetcher';
import Storage from './Storage';
import StoredItem from './StoredItem';

class StoredFetcher {
  readonly storage: Storage;

  readonly fetcher: Fetcher;

  readonly key: string;

  static generateExpiredDate(maxAge: number = 10) {
    return new Date(new Date().getTime() + maxAge * 1000);
  }

  static isExpired(storedItem: StoredItem) {
    return storedItem
      && new Date(storedItem.expiredAt).valueOf() - new Date().valueOf() < 0;
  }

  constructor(storage: Storage, fetcher: Fetcher, key = 'STORED-FETCHER') {
    this.storage = storage;
    this.fetcher = fetcher;
    this.key = key;
  }

  async fetch(
    fetchParam: FetchParam,
    options: { maxAge: number } = { maxAge: 10 },
  ): Promise<{ data: unknown, cached: boolean }> {
    const { uri, method } = fetchParam;
    const { maxAge } = options;
    if (method !== 'GET') {
      throw new Error('StoredFetcher applys onley GET method');
    }
    const storedItem = this.storage.getItem(this.getItemKey(uri));
    if (storedItem && !StoredFetcher.isExpired(storedItem)) {
      this.store({ key: this.getItemKey(uri), data: storedItem.data, maxAge });
      return { data: storedItem.data, cached: true };
    }
    const data = await this.fetcher.fetch(fetchParam);
    this.store({ key: this.getItemKey(uri), data, maxAge });
    return { data, cached: false };
  }

  getItemKey(uri: string) {
    return `${this.key}__${uri}`;
  }

  store({ key, data, maxAge }: { key: string, data: unknown, maxAge: number}) {
    this.storage.setItem(key, {
      data,
      expiredAt: StoredFetcher.generateExpiredDate(maxAge),
    });
  }

  discard({ key }: { key: string }) {
    this.storage.removeItem(this.getItemKey(key));
  }
}

export default StoredFetcher;
