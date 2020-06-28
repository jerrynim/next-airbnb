import App, { AppInitialProps, AppContext, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";

const app = ({ Component, pageProps }: AppProps & AppInitialProps) => {
  return (
    <>
      <Header />
      <GlobalStyle />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
};

app.getInitialProps = async (context: AppContext) => {
  const appInitialProps: AppInitialProps = await App.getInitialProps(context);
  return { ...appInitialProps };
};

export default app;
