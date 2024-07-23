import { hookstate, State, useHookstate } from "@hookstate/core";

type Type = "success" | "error" | "warning" | "info" | "";
type Alert = {
  message: string;
  type: Type;
};
const alert = hookstate<Alert>({
  message: "",
  type: "",
});

export const useAlert = () => {
  const state = useHookstate(alert);
  const value = state.value;
  const set = state.set as (val: Alert) => void;
  const reset = () => state.set({ message: "", type: "" });
  const isEmpty = state.value.message === "";
  return [value, set, reset, isEmpty] as const;
};
