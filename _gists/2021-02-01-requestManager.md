---
title: 'HTTP Request Manager'
date: '2020-03-16T05:35:07.322Z'
tags:
  - typescript
  - axios
---

```typescript
import Axios, { AxiosRequestConfig } from "axios";

const request = async (config: AxiosRequestConfig) => {
    config.headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...config.headers,
    };
    return Axios(config);
};

export default {
    get: async (url: string, config?: AxiosRequestConfig) =>
        request({
            method: "get",
            url,
            ...config,
        }),

    put: async (
        url: string,
        data: AxiosRequestConfig["data"],
        config?: AxiosRequestConfig
    ) =>
        request({
            method: "put",
            url,
            data,
            ...config,
        }),

    post: async (
        url: string,
        data: AxiosRequestConfig["data"],
        config?: AxiosRequestConfig
    ) =>
        request({
            method: "post",
            url,
            data,
            ...config,
        }),

    patch: async (
        url: string,
        data: AxiosRequestConfig["data"],
        config?: AxiosRequestConfig
    ) =>
        request({
            method: "patch",
            url,
            data,
            ...config,
        }),

    delete: async (url: string, config?: AxiosRequestConfig) =>
        request({
            method: "delete",
            url,
            ...config,
        }),
};

```
