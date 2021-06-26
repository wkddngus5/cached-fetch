import SelfFetcher from '../lib/Fetcher/SelfFetcher';
import MapStorage from '../lib/Storage/MapStorage';
import StoredFetcher from '../lib/StoredFetcher';

describe('StoredFetcher', () => {
  let storedFetcher: StoredFetcher;
  beforeAll(() => {
    storedFetcher = new StoredFetcher(new MapStorage(), new SelfFetcher());
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

    const response1 = await storedFetcher.fetch({
      url: `www.naver.com?body=${JSON.stringify(body)}`,
      method: 'GET',
      headers: {},
    });
    expect(response1.cached).toBeFalsy();
    const response2 = await storedFetcher.fetch({
      url: `www.naver.com?body=${JSON.stringify(body)}`,
      method: 'GET',
      headers: {},
    });
    expect(response2).toBeTruthy();
    expect(response1.data).toEqual(response2.data);
  });
});
