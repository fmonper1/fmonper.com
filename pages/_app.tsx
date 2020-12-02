import React from "react";
import "../resources/styles/style.scss";
import App from "next/app";
import PageHeader from "@components/template/PageHeader";

export default class MyApp extends App {
  render() {
    // @ts-ignore
    const { Component, pageProps } = this.props;
    return (
      <>
        <PageHeader />
        <Component {...pageProps} />
      </>
    );
  }
}
