import CachedItem from '../CachedItem';

abstract class Storage<StorageCore = unknown> {
  abstract core: StorageCore;

  // eslint-disable-next-line no-unused-vars
  abstract getItem(key: string): CachedItem;

  // eslint-disable-next-line no-unused-vars
  abstract setItem(key: string, item: CachedItem): void;

  // eslint-disable-next-line no-unused-vars
  abstract removeItem(key: string): void;
}

export default Storage;
