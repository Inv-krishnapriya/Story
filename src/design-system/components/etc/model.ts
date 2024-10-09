export type PromiseCallback<T, K = unknown> = {
  resolve: (v: T) => void;
  reject: (v: K) => void;
};
