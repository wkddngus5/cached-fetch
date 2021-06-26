abstract class Fetcher<Response = unknown> {
  abstract fetch: () => Response;
}

export default Fetcher;
