import App, { AppInitialProps, AppContext, AppProps } from "next/app";
import GlobalStyle from "../styles/GlobalStyle";

const app = ({ Component, pageProps }: AppProps & AppInitialProps) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

app.getInitialProps = async (context: AppContext) => {
  const appInitialProps: AppInitialProps = await App.getInitialProps(context);
  return { ...appInitialProps };
};

export default app;
