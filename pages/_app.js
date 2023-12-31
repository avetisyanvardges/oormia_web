import React, {Fragment, useMemo} from "react";
import Head from "next/head";
import {Provider} from "react-redux";
import {wrapper} from "store";
import "styles/style.scss";
import {IntlProvider} from "react-intl";
import messages from "../locales";

const App = ({Component, ...rest}) => {
  const {store, props} = wrapper.useWrappedStore(rest);
  const Layout = useMemo(() => Component.Layout || Fragment, [Component]);
    return (
        <>
            <Head>
                <meta content="ie=edge" httpEquiv="x-ua-compatible"/>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <title>OOrmia - Explore | Learn | Connect</title>
            </Head>
            <IntlProvider locale={'en'} messages={messages["en"]}>
                <Provider store={store}>
                    <Layout {...props.layoutInitialProps} {...Component.layoutProps}>
                        <Component {...props.pageProps} />
                    </Layout>
                </Provider>
            </IntlProvider>
        </>
    )
}

App.getInitialProps = wrapper.getInitialPageProps(store => async (context) => {
  const {ctx, Component} = context;
  ctx.store = store;

  const layoutInitialProps = Component.Layout?.getInitialProps ? await Component.Layout.getInitialProps(ctx) : {};
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return {pageProps, layoutInitialProps}
})

export default App;
