import {AxiosError} from "axios";
import { buildClient } from '@/api/build-client'

const LandingPage = ({ user }) => {
  if (user) {
    return <h1>Welcome {user.email}</h1>
  }

  return <h1>Landing page</h1>
}

LandingPage.getInitialProps = async (context) => {
  try {
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentUser')

    return data || {};
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      console.log("getInitialProps: currentUser: ", err?.response?.data);
    }

    return {};
  }
};

export default LandingPage;
