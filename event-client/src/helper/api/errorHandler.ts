import axios from "axios";

export const getError = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    const message = (err.response?.data as { message?: unknown }).message;
    if (typeof message === "string") {
      return message;
    } else {
      return "An unknown error occurred (server response).";
    }
  } else if (err && "message" in err && typeof err.message === "string") {
    // Fallback to the generic error message
    return err.message;
  } else {
    // Fallback for truly unknown errors
    return "An unexpected error occurred.";
  }
};
