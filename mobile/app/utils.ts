export const throttleFunc = (func: () => void, delay: number) => {
  let timeout: null | number = null;
  if (!timeout) {
    func();
    timeout = setTimeout(() => {
      timeout = null;
    }, delay);
  }
};

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  if (typeof error === "string") {
    return error;
  }

  return "Something went wrong please try again later";
};
