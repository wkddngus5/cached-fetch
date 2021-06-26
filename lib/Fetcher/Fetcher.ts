type Method = 'GET';

export type FetchParam = {
  url: string;
  method: Method;
  headers: { [key: string]: unknown };
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
