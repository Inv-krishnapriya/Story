import { renderHook, act } from "@testing-library/react";
import useToggle from "../useToggle";

describe("useToggle", () => {
  it("should initialize with the provided initial state", () => {
    const initialState = true;

    const { result } = renderHook(() => useToggle(initialState));
    const [value] = result.current;

    expect(value).toBe(initialState);
  });

  it("should toggle the state value correctly", () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      const [, toggleState] = result.current;
      toggleState();
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      const [, toggleState] = result.current;
      toggleState();
    });

    expect(result.current[0]).toBe(false);
  });

  it("should set the state value correctly", () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      const [, , setState] = result.current;
      setState(true);
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      const [, , setState] = result.current;
      setState(false);
    });

    expect(result.current[0]).toBe(false);
  });
});
