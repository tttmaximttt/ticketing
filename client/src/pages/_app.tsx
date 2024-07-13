// These styles apply to every route in the application
import '../globals.css'
import type { AppProps } from 'next/app'
import {buildClient} from "@/api/build-client";
import {AxiosError} from "axios";
import Header from "@/components/header";

const AppComponent = ({ Component, pageProps, user }: AppProps) => {
  return (
    <div>
      <Header user={user}/>
      <Component {...pageProps} />
    </div>
  );
}

AppComponent.getInitialProps = async (appContext) => {
  try {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentUser')
    let pageProps = {};

    if (appContext.Component.getInitialProps) {
      pageProps = await appContext.Component.getInitialProps(appContext.ctx)
    }

    return {
      pageProps,
      ...data,
    };
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      console.log("getInitialProps: currentUser: ", err?.response?.data);
    }

    return {};
  }
};

export default AppComponent;
