import App, { AppContext, AppProps } from "next/app";
import axios from "../lib/api";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "../components/Header";
import { cookieStringToObject } from "../lib/utils";
import { getUser } from "../lib/api/user";
import { wrapper } from "../store";
import { userActions } from "../store/user";
import "react-datepicker/dist/react-datepicker.css";

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
  const { store } = context.ctx;
  const { isLogged } = store.getState().user;
  try {
    if (!isLogged && cookieObject.access_token) {
      axios.defaults.headers.cookie = cookieObject.access_token;
      const { data } = await getUser();
      store.dispatch(userActions.setUser(data));
    }
  } catch (e) {
    console.log(e);
  }
  return { ...appInitialProps };
};

export default wrapper.withRedux(app);
