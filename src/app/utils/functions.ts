/**
 * Debounces a function to limit the rate at which it can be invoked.
 *
 * @param fn - The function to debounce.
 * @param delay - The debounce delay in milliseconds (default: 1000).
 * @returns A debounced version of the input function.
 */
export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 1000
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
