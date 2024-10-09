import { renderHook, act } from "@testing-library/react";
import useCopyToClipboard from "../useCopyToClipBoard";

describe("useCopyToClipboard", () => {
  beforeAll(() => {
    // Mock the Clipboard API writeText function
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: jest.fn().mockResolvedValue(undefined),
      },
    });
  });

  it("should set copied state to true when text is successfully copied", async () => {
    const { result } = renderHook(() => useCopyToClipboard());

    const [, copyToClipboard] = result.current;

    await act(async () => {
      await copyToClipboard("example text");
    });

    expect(result.current[0]).toBe(true);
  });

  it("should reset copied state", () => {
    const { result } = renderHook(() => useCopyToClipboard());

    const [, , resetCopied] = result.current;

    act(() => {
      resetCopied();
    });

    expect(result.current[0]).toBe(false);
  });
});
