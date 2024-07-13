import axios, {AxiosError, AxiosInstance} from "axios";

export const buildClient = ({ req }): AxiosInstance => {
  if (typeof window !== 'undefined') {
    return axios.create({ baseURL: '/' })
  }

  return axios.create({
    baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
    headers: req.headers,
  })
};
