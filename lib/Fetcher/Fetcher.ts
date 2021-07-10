type Method = 'GET';

export type FetchParam = {
  uri: string;
  method: Method;
  headers?: Headers;
};

abstract class Fetcher<
  FetcherCore = unknown,
  FetcherResponse = unknown
> {
  abstract core: FetcherCore;

  // eslint-disable-next-line no-unused-vars
  abstract fetch(fetchParam: FetchParam): Promise<FetcherResponse>;
}

export default Fetcher;
