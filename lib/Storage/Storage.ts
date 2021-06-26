import StoredItem from '../StoredItem';

abstract class Storage<StorageCore = unknown> {
  abstract core: StorageCore;

  // eslint-disable-next-line no-unused-vars
  abstract getItem(key: string): StoredItem;

  // eslint-disable-next-line no-unused-vars
  abstract setItem(key: string, item: StoredItem): void;
}

export default Storage;
