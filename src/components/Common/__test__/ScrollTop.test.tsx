// ScrollTop.test.js

import React from "react";
import { render } from "@testing-library/react";

import { usePathname } from "next/navigation";
import ScrollTop from "../ScrollTop";

// Mocking the usePathname hook
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("ScrollTop component", () => {
  beforeEach(() => {
    // Reset mock implementation before each test
    (usePathname as any).mockReset();
  });

  it("should scroll to the top when pathname changes", () => {
    // Mock usePathname to return different values
    (usePathname as any)
      .mockReturnValueOnce("/old-path")
      .mockReturnValueOnce("/new-path");

    const scrollToSpy = jest.spyOn(window, "scrollTo");

    render(<ScrollTop />);

    // Expect scrollTo to have been called with (0, 0)
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);

    // Cleanup
    scrollToSpy.mockRestore();
  });
});
