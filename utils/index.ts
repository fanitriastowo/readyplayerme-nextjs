export const getAccessToken = (): string => {
  if ((process.env.NEXT_PUBLIC_COOKIE_NAME as string) !== "") {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem(
        process.env.NEXT_PUBLIC_COOKIE_NAME as string
      );
      return token !== null ? token : "";
    }
  }

  return "";
};
