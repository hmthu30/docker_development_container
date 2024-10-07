import { useCallback } from "react";

interface ErrorResponse {
  response?: {
    status?: number;
  };
  message?: string;
  stack?: string;
}

type OnErrorHandler = (error: ErrorResponse) => boolean | void;

const useHandleError = (onError?: OnErrorHandler) => {
  return useCallback(
    (error: ErrorResponse) => {
      const status = error?.response?.status || "unknown";
      const shouldContinue = onError ? onError(error) : true;
      if (!shouldContinue) return;

      console.error("Error occurred:", {
        status,
        message: error.message,
        stack: error.stack,
      });
    },
    [onError],
  );
};

//export * from  "../../../../../../../../../../../../../../../../"

export { useHandleError };
