class Url {
  readonly url: string;

  readonly path: string;

  readonly queryString?: string;

  readonly params: {[key: string]: string} = {};

  constructor(url: string) {
    this.url = url;
    [this.path, this.queryString] = this.url.split('?');
    this.queryString?.split('&').forEach((eachParamString: string) => {
      const [key, value] = eachParamString.split('=');
      this.params[key] = value;
    });
  }
}

export default Url;
