import queryString from "query-string";
import snakecaseKeys from "snakecase-keys";

import { camelizeJSON } from "./JSONUtils";

export enum HTTPVerb {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export const Encoders = {
  JSON: {
    module: { ...JSON, stringify: (data: any) => JSON.stringify(snakecaseKeys(data)) },
    contentType: "application/json",
  },
  QUERY: {
    module: queryString,
    contentType: "application/x-www-form-urlencoded",
  },
};

function checkStatus(response: Response) {
  if ((response.status >= 200 && response.status < 300) || response.status === 422) {
    return response;
  } else {
    throw response;
  }
}

export function skipsCSRF(method: string) {
  return /^(GET|HEAD|OPTIONS|TRACE)$/i.test(method);
}

type CommonOptions = {
  headers?: { [header: string]: any };
};

type GetOptions = CommonOptions;
type DeleteOptions = CommonOptions;

type PostOptions = CommonOptions & {
  encoder?: typeof Encoders[keyof typeof Encoders];
};

export class HTTPUtil {
  constructor(public endpoint: string, private authToken?: string) {}

  setAuthToken(token: string) {
    this.authToken = token;
  }

  async get<T>(url: string, queryParams?: object, opts: GetOptions = {}) {
    const { headers } = opts;
    const query = queryParams != null ? "?" + queryString.stringify(queryParams) : "";

    return this.send<T>(HTTPVerb.GET, `${url}${query}`, { headers });
  }

  async post<T>(url: string, data: object, opts: PostOptions = {}) {
    const { headers, encoder = Encoders.JSON } = opts;

    return this.send<T>(HTTPVerb.POST, url, {
      headers: {
        "Content-Type": encoder.contentType,
        ...headers,
      },
      body: encoder.module.stringify(data),
    });
  }

  async put<T>(url: string, data: object, opts: PostOptions = {}) {
    const { headers, encoder = Encoders.JSON } = opts;

    return this.send<T>(HTTPVerb.PUT, url, {
      headers: {
        "Content-Type": encoder.contentType,
        ...headers,
      },
      body: encoder.module.stringify(data),
    });
  }

  async patch<T>(url: string, data?: object, opts: PostOptions = {}) {
    const { headers, encoder = Encoders.JSON } = opts;

    return this.send<T>(HTTPVerb.PATCH, url, {
      headers: {
        "Content-Type": encoder.contentType,
        ...headers,
      },
      body: data ? encoder.module.stringify(data) : undefined,
    });
  }

  async delete(url: string, opts: DeleteOptions = {}) {
    const { headers } = opts;

    return this.send(HTTPVerb.DELETE, url, {
      headers: {
        ...headers,
      },
    });
  }

  async send(verb: HTTPVerb.DELETE, url: string, options?: RequestInit): Promise<void>;
  async send<T>(verb: HTTPVerb, url: string, options?: RequestInit): Promise<T>;
  async send<T>(verb: HTTPVerb, url: string, options?: RequestInit): Promise<T | void> {
    // Prepend API_BASE_URL on plain-path requests
    const resolvedUrl = url[0] === "/" ? `${this.endpoint}${url}` : url;

    const response = await fetch(resolvedUrl, {
      method: verb,
      ...options,
      headers: new Headers({
        ...this.getDefaultHeaders(verb),
        ...options?.headers,
      }),
    });
    checkStatus(response);

    try {
      const json = await response.json();
      const parsed = camelizeJSON<T>(json);

      if (response.status === 422 || response.status === 500) {
        return Promise.reject(parsed);
      } else {
        return Promise.resolve(parsed);
      }
    } catch (err) {
      if (response.status === 204) {
        return Promise.resolve();
      } else {
        return Promise.reject(err);
      }
    }
  }

  getDefaultHeaders(_method: string) {
    const headers: { [header: string]: any } = {
      "Content-Type": "application/json",
    };

    if (this.authToken != null) {
      headers["X-Session-Token"] = this.authToken;
    }

    return headers;
  }
}
