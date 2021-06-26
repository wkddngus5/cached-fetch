import Fetcher, { FetchParam } from './Fetcher';
import Url from './Url';

class SelfFetcher extends Fetcher {
  core: { request?: FetchParam; response?: unknown } = {};

  fetch(fetchParam: FetchParam): Promise<unknown> {
    const url = new Url(fetchParam.url);

    this.core = {
      request: fetchParam,
      response: {
        ok: true,
        url: url.url,
        redirected: false,
        status: 200,
        ...Object.fromEntries(
          Object.entries(url.params).map(([key, value]) => [
            key,
            JSON.parse(value),
          ]),
        ),
      },
    };
    return Promise.resolve(this.core.response);
  }
}

export default SelfFetcher;
