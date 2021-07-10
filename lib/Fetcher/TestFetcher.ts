import Fetcher, { FetchParam } from './Fetcher';
import Uri from './Uri';

class TestFetcher extends Fetcher {
  core: { request?: FetchParam; response?: unknown } = {};

  fetch(fetchParam: FetchParam): Promise<unknown> {
    const uri = new Uri(fetchParam.uri);

    this.core = {
      request: fetchParam,
      response: {
        ok: true,
        uri: uri.uri,
        redirected: false,
        status: 200,
        ...Object.fromEntries(
          Object.entries(uri.params).map(([key, value]) => [
            key,
            JSON.parse(value),
          ]),
        ),
      },
    };
    return Promise.resolve(this.core.response);
  }
}

export default TestFetcher;
