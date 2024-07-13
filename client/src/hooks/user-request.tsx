import axios, {AxiosError, AxiosResponse} from "axios";
import {ReactNode, useState } from "react"

export default ({ url, method, body, onSuccess }: { url: string, method: string, body?: Record<string, unknown>, onSuccess?: () => {}  }) => {
  const [errors, setErrors] = useState<ReactNode>(null);

  const doRequest = async () => {
    try {
      let response: AxiosResponse | null = null;

      switch (method) {
        case "POST":
          response = await axios.post(url, body);
          break;
        case "PUT":
          response = await axios.put(url, body);
          break;
        case "DELETE":
          response = await axios.delete(url, body);
          break;
        case "PATCH":
          response = await axios.patch(url, body);
          break;
        case "GET":
          response = await axios.get(url);
          break;
      }

      onSuccess && onSuccess()
      return response;
    } catch (err) {
      if (err instanceof AxiosError) {
        setTimeout(() => {
          setErrors([]);
        }, 5000);

        return setErrors(
          err?.response?.data?.errors?.map((errorItem: { message: string }, index: number) => <li
            className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700"
            key={index}>{errorItem.message}</li>)
        )
      }
    }
  };

  return {doRequest, errors};
};
