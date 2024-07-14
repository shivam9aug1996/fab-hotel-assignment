export const debounce = (fn: (...args: any) => void, delay: number = 1000) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export const getLastPathSegment = (url: string) => {
  const segments = url?.split("/");
  return decodeURIComponent(segments?.pop()!);
};
