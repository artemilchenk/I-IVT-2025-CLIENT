class HttpClient {
  private readonly url = "http://localhost:4000";
  constructor() {}

  get baseUrl(): string {
    return this.url;
  }
}

export const httpClient = new HttpClient();
