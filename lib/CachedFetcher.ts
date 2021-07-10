import Fetcher, { FetchParam } from './Fetcher/Fetcher';
import Storage, { SessionStorage } from './Storage';
import CachedItem from './CachedItem';
import HTMLFetcher from './Fetcher/HTMLFetcher';

class CachedFetcher {
  readonly storage: Storage;

  readonly fetcher: Fetcher;

  readonly key: string;

  static generateExpiredDate(maxAge: number = 10) {
    return new Date(new Date().getTime() + maxAge * 1000);
  }

  static isExpired(cachedItem: CachedItem) {
    return cachedItem
      && new Date(cachedItem.expiredAt).valueOf() - new Date().valueOf() < 0;
  }

  constructor(storage: Storage = new SessionStorage(), fetcher: Fetcher = new HTMLFetcher(), key = 'STORED-FETCHER') {
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
      throw new Error('CachedFetcher applys onley GET method');
    }
    const cachedItem = this.storage.getItem(this.getItemKey(uri));
    if (cachedItem && !CachedFetcher.isExpired(cachedItem)) {
      this.cache({ key: this.getItemKey(uri), data: cachedItem.data, maxAge });
      return { data: cachedItem.data, cached: true };
    }
    const data = await this.fetcher.fetch(fetchParam);
    this.cache({ key: this.getItemKey(uri), data, maxAge });
    return { data, cached: false };
  }

  getItemKey(uri: string) {
    return `${this.key}__${uri}`;
  }

  cache({ key, data, maxAge }: { key: string, data: unknown, maxAge: number}) {
    this.storage.setItem(key, {
      data,
      expiredAt: CachedFetcher.generateExpiredDate(maxAge),
    });
  }

  discard({ key }: { key: string }) {
    this.storage.removeItem(this.getItemKey(key));
  }
}

export default CachedFetcher;
