class Uri {
  readonly uri: string;

  readonly path: string;

  readonly queryString?: string;

  readonly params: {[key: string]: string} = {};

  constructor(uri: string) {
    this.uri = uri;
    [this.path, this.queryString] = this.uri.split('?');
    this.queryString?.split('&').forEach((eachParamString: string) => {
      const [key, value] = eachParamString.split('=');
      this.params[key] = value;
    });
  }
}

export default Uri;
