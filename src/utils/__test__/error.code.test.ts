import { BackendErrorCode } from "../error.code";

describe("Backend Error Codes Tests", () => {
  it("should have unique error codes", () => {
    const errorCodes = Object.values(BackendErrorCode);
    const uniqueCodes = new Set(errorCodes);
    expect(uniqueCodes.size).toBe(errorCodes.length);
  });

  it("should have valid error code values", () => {
    const errorCodes = Object.values(BackendErrorCode);

    errorCodes.forEach((code) => {
      // Check if each error code is a non-empty string
      expect(typeof code).toBe("string");
      expect(code.length).toBeGreaterThan(0);
    });
  });

  it("should have AUTH_FAIL error code", () => {
    expect(BackendErrorCode.AUTH_FAIL).toBe("E300001");
  });

  it("should have GET_AUTH_CODES_FAIL error code", () => {
    expect(BackendErrorCode.GET_AUTH_CODES_FAIL).toBe("E300002");
  });

  it("should have REFRESH_TOKEN_GENERATE_FAIL error code", () => {
    expect(BackendErrorCode.REFRESH_TOKEN_GENERATE_FAIL).toBe("E300003");
  });

  it("should have TOKEN_VALIDATION_FAIL error code", () => {
    expect(BackendErrorCode.TOKEN_VALIDATION_FAIL).toBe("E300004");
  });
});
