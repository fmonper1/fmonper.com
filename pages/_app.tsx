import React from "react";
import "../resources/styles/style.scss";
import App from "next/app";
import PageHeader from "@components/template/PageHeader";
import Footer from "@components/template/Footer";

export default class MyApp extends App {
  render() {
    // @ts-ignore
    const { Component, pageProps } = this.props;
    return (
      <div className="flex flex-col min-h-screen">
        <PageHeader />
        <div className="w-full flex-grow">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    );
  }
}
