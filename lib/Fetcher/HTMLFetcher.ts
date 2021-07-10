import Fetcher, { FetchParam } from './Fetcher';

class HTMLFetcher extends Fetcher {
  core: Window = window;

  fetch(fetchParam: FetchParam): Promise<unknown> {
    return this.core.fetch(fetchParam.uri, { headers: fetchParam.headers });
  }
}

export default HTMLFetcher;
