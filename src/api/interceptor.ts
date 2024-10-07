import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

/**
 *  baseURL: backend URL and its cannot be null or undefined
 *  timeout: milliseconds between requests and responses timeout
 *  headers: send to the server with secure headers
 *  validateStatus: reject only if status is outside the range
 *
 */
const instance = axios.create({
  baseURL: new URL("api", process.env.API_URL!).toString(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Referrer-Policy": "no-referrer-when-downgrade",
    "Feature-Policy": "microphone 'none'; geolocation 'none';",
  },
  validateStatus: (status: number) => status >= 200 && status < 300,
});

/**
 *  Request interceptor
 *  Add token to headers before each request
 *
 */
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = Cookies.get("token");
    if (true) {
      config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ3eW0yQGdtYWlsLmNvbSIsImlhdCI6MTcyNTk1OTgyNSwiZXhwIjoxNzI1OTYzNDI1fQ.cCtObu6JZFVsGodZvk2gh2krJsQfCjBue-n2c6p3xkc`;
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  },
);

/**
 *  Response interceptor
 *  log the response status when common error is returned
 *
 */
instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<AxiosError> => {
    const msg = error.response
      ? {
          400: `Bad Request (400): ${error.response.data}`,
          401: "Unauthorized (401): Token invalid or expired.",
          403: `Forbidden (403): ${error.response.data}`,
          404: `Not Found (404): ${error.response.data}`,
          500: `Internal Server Error (500): ${error.response.data}`,
        }[error.response.status] ||
        `Unhandled status code: ${error.response.status}`
      : `Network or other error: ${error.message}`;

    console.error(msg);
    return Promise.reject(error);
  },
);

export default instance;
