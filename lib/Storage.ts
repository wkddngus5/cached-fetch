type StoreData = unknown;

abstract class Storage<DataType = StoreData> {
  abstract getItem: () => DataType;

  abstract setItem: () => void;
}

export default Storage;
