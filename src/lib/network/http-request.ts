import queryString from "query-string";

import { CommonResponse } from "./types";

type Header = HeadersInit & {};

async function responseToJson<Res = unknown>(response: Response) {
  const json = await response.json();

  if (!response.ok) {
    throw json;
  }

  return json as CommonResponse<Res>;
}

export default class RepsApiRequest {
  private static baseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

  static defaultHeaders: Header = {};

  static async get<Res = unknown, Req = unknown>(
    uri: string,
    bodyData?: Req,
    headerData?: Header,
    signal?: AbortSignal,
  ) {
    const path = `${this.baseUrl}${uri}?${queryString.stringify(bodyData as queryString.ParsedQuery)}`;

    const response = await fetch(path, {
      method: "GET",
      headers: {
        ...this.defaultHeaders,
        ...headerData,
      },
      signal,
    });

    return await responseToJson<Res>(response);
  }

  static async set<Res = unknown, Req = unknown>(
    method: "POST" | "PUT" | "DELETE",
    uri: string,
    bodyData?: Req,
    headerData?: Header,
  ) {
    const response = await fetch(this.baseUrl + uri, {
      method,
      headers: {
        ...this.defaultHeaders,
        ...headerData,
      },
      body: JSON.stringify(bodyData),
    });

    return await responseToJson<Res>(response);
  }
}

export class RepsProApiRequest {
  private static baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

  static defaultHeaders: Header = {
    accept: "*/*",
    "Content-Type": "application/json",
  };

  private static parseCookie(cookie: string) {
    const map = new Map();
    for (const pair of cookie.split(/; */)) {
      if (!pair) continue;
      const splitAt = pair.indexOf("=");
      if (splitAt === -1) {
        map.set(pair, "true");
        continue;
      }
      const [key, value] = [pair.slice(0, splitAt), pair.slice(splitAt + 1)];
      try {
        map.set(key, decodeURIComponent(value != null ? value : "true"));
      } catch {}
    }
    return map;
  }

  static async get<Res = unknown, Req = unknown>(
    uri: string,
    bodyData?: Req,
    headerData?: Header,
  ) {
    const path = `${this.baseUrl}${uri}?${queryString.stringify(bodyData as queryString.ParsedQuery)}`;

    const response = await fetch(path, {
      method: "GET",
      headers: {
        ...this.defaultHeaders,
        ...headerData,
        Authorization: `Bearer ${this.parseCookie(document.cookie).get("token")}`,
      },
    });

    return await responseToJson<Res>(response);
  }

  static async set<Res = unknown, Req = unknown>(
    method: "POST" | "PUT" | "DELETE" | "PATCH",
    uri: string,
    bodyData?: Req,
    headerData?: Header,
  ) {
    const response = await fetch(this.baseUrl + uri, {
      method,
      headers: {
        ...this.defaultHeaders,
        ...headerData,
        Authorization: `Bearer ${this.parseCookie(document.cookie).get("token")}`,
      },
      body: JSON.stringify(bodyData),
    });

    return await responseToJson<Res>(response);
  }
}
