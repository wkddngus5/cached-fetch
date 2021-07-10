import TestFetcher from '../lib/Fetcher/TestFetcher';
import MapStorage from '../lib/Storage/MapStorage';
import StoredFetcher from '../lib/StoredFetcher';

describe('StoredFetcher', () => {
  let storedFetcher: StoredFetcher;
  beforeAll(() => {
    storedFetcher = new StoredFetcher(new MapStorage(), new TestFetcher());
  });

  it('contructor', async () => {
    expect(storedFetcher).toBeTruthy();
  });

  it('store', async () => {
    const body = {
      user: {
        id: 1,
        name: 'name',
      },
    };

    const uri = `www.test.com?body=${JSON.stringify(body)}`;
    const response1 = await storedFetcher.fetch({
      uri,
      method: 'GET',
      headers: {},
    });
    expect(response1.cached).toBeFalsy();
    const response2 = await storedFetcher.fetch({
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
    const response1 = await storedFetcher.fetch({
      uri,
      method: 'GET',
      headers: {},
    });
    expect(response1.cached).toBeFalsy();
    const response2 = await storedFetcher.fetch({
      uri,
      method: 'GET',
      headers: {},
    });
    expect(response2).toBeTruthy();

    storedFetcher.discard({ key: uri });
    const response3 = await storedFetcher.fetch({
      uri,
      method: 'GET',
      headers: {},
    });
    expect(response3.cached).toBeFalsy();
  });
});
