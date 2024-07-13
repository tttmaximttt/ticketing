import { FormEvent, useState } from "react";
import Router from "next/router"
import useUserRequest from "../../hooks/user-request";

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { doRequest, errors } = useUserRequest({
    url: '/api/users/signup',
    method: "POST",
    body: {
      email,
      password
    },
    onSuccess: () => Router.push('/')
  })


  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await doRequest();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-black md:text-5xl lg:text-6xl"><span
        className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Signup</span></h1>
      <div className="relative z-0 w-full mb-5 group">
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="floating_email"
               id="floating_email"
               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
               placeholder=" " required/>
        <label htmlFor="floating_email"
               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email
          Address</label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="floating_password"
               id="floating_password"
               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
               placeholder=" " required/>
        <label htmlFor="floating_password"
               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
      </div>
      {errors && <div role="alert" className="bg-red-500 text-black font-bold rounded-t px-4 py-2">
        <h4>Oops!</h4>
        <ul className="my-0">{errors}</ul>
      </div>}
      <button type="submit"
              className="btn-primary">Submit
      </button>
    </form>
  )
}

export default Signup;
