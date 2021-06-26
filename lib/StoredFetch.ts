import Fetcher from './Fetcher';
import Storage from './Storage';

class StoredFetch {
  store: Storage;

  fetcher: Fetcher;

  constructor(storage: Storage, fetcher: Fetcher) {
    this.store = storage;
    this.fetcher = fetcher;
  }
}

export default StoredFetch;
