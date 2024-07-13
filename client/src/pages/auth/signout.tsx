import { useEffect } from "react";
import Router from "next/router"
import useUserRequest from "../../hooks/user-request";

const Signout = () => {
  const { doRequest, errors } = useUserRequest({
    url: '/api/users/signout',
    method: "POST",
    body: {},
    onSuccess: () => Router.push('/')
  })


  useEffect(() => {}, [
    doRequest()
  ]);

  return (
    <div>Signout</div>
  )
}

export default Signout;
