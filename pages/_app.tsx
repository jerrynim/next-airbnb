import App, { AppContext, AppProps } from "next/app";
import axios from "axios";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import { cookieStringToObject } from "../lib/utils";
import { getUser } from "../lib/api/user";
import { wrapper } from "../store";
import { userActions } from "../store/user";

const app = ({ Component, pageProps }: AppProps) => {
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
  const appInitialProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  try {
    axios.defaults.headers.Cookie = cookieObject.access_token;
    const { data } = await getUser();
    context.ctx.store.dispatch(userActions.setUser(data));
  } catch (e) {
    console.log(e);
  }
  return { ...appInitialProps };
};

export default wrapper.withRedux(app);
