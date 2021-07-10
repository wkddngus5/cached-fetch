import TestFetcher from '../lib/Fetcher/TestFetcher';
import MapStorage from '../lib/Storage/MapStorage';
import CachedFetcher from '../lib/CachedFetcher';

describe('CachedFetcher', () => {
  let cachedFetcher: CachedFetcher;
  beforeAll(() => {
    cachedFetcher = new CachedFetcher(new MapStorage(), new TestFetcher());
  });

  it('contructor', async () => {
    expect(cachedFetcher).toBeTruthy();
  });

  it('cache', async () => {
    const body = {
      user: {
        id: 1,
        name: 'name',
      },
    };

    const uri = `www.test.com?body=${JSON.stringify(body)}`;
    const response1 = await cachedFetcher.fetch({
      uri,
      method: 'GET',
      headers: {},
    });
    expect(response1.cached).toBeFalsy();
    const response2 = await cachedFetcher.fetch({
      uri,
      method: 'GET',
      headers: {},
    });
    expect(response2).toBeTruthy();
    expect(response1.data).toEqual(response2.data);
  });

  it('discard', async () => {
    const body = {
      user: {
        id: 1,
        name: 'name',
      },
    };
    const uri = `www.test2.com?body=${JSON.stringify(body)}`;
    const response1 = await cachedFetcher.fetch({
      uri,
      method: 'GET',
      headers: {},
    });
    expect(response1.cached).toBeFalsy();
    const response2 = await cachedFetcher.fetch({
      uri,
      method: 'GET',
      headers: {},
    });
    expect(response2).toBeTruthy();

    cachedFetcher.discard({ key: uri });
    const response3 = await cachedFetcher.fetch({
      uri,
      method: 'GET',
      headers: {},
    });
    expect(response3.cached).toBeFalsy();
  });
});
