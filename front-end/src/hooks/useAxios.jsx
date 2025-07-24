import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://10.10.12.91:4000/api/v1/",
});

const useAxios = () => {
  return axiosInstance;
};
export default useAxios;
