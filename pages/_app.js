import Head from "next/head";
import Navbar from "../components/Navbar";
import config from "../config";
import Router from "next/router";
import NProgress from "nprogress";

import "../assets/index.css";
import "../assets/newspaper.css";

import SocialLinks from "../components/SocialLinks";
import Footer from "../components/Footer";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{config.title}</title>
        <link rel="shortcut icon" type="image/png" href={config.logo} />
        <link rel="icon" type="image/png" href={config.logo} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        {config.description && <meta name="description" content={config.description} />}
        {config.keywords && <meta name="keywords" content={config.keywords} />}
        {config.googleAnalyticsId && (
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsId}`}></script>
        )}
        <script type="module" src="https://unpkg.com/ionicons/dist/ionicons/ionicons.esm.js"></script>
        <script noModule="" src="https://unpkg.com/ionicons/dist/ionicons/ionicons.js"></script>
      </Head>
      <Navbar logo={config.logo} menu={config.menu} />
      <SocialLinks />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default MyApp;
