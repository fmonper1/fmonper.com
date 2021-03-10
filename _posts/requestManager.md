---
title: 'HTTP Request Manager'
date: '2020-03-16T05:35:07.322Z'
tags:
  - typescript
  - axios
---

```typescript
import Axios, { AxiosPromise, AxiosRequestConfig } from "axios";

const request = async (config: AxiosRequestConfig) => {
    config.headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...config.headers,
    };
    return Axios(config);
};

export default {
    get: async (url: string, config: AxiosRequestConfig) =>
        request({
            method: "get",
            url,
            ...config,
        }),
    put: async (url: string, config: AxiosRequestConfig) =>
        request({
            method: "put",
            url,
            ...config,
        }),
    post: async (url: string, config: AxiosRequestConfig) =>
        request({
            method: "post",
            url,
            ...config,
        }),

    patch: async (url: string, config: AxiosRequestConfig) =>
        request({
            method: "patch",
            url,
            ...config,
        }),

    delete: async (url: string, config: AxiosRequestConfig) =>
        request({
            method: "delete",
            url,
            ...config,
        }),
};

```
