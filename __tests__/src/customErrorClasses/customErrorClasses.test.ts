import { expect, test, describe, jest } from "bun:test";
import {
  customErrorClasses,
  CustomError,
  BaseCustomError,
} from "../../../src/customErrorClasses/customErrorClasses";

const {
  ValidationError,
  UnauthorizedError,
  NotFoundError,
  ServerError,
  BadRequestError,
  ConflictError,
  ForbiddenError,
  MethodNotAllowedError,
  TooManyRequestsError,
  UnsupportedMediaTypeError,
  UnprocessableEntityError,
  ServiceUnavailableError,
  GatewayTimeoutError,
} = customErrorClasses;

describe("Checking Correct Error codes are returned", () => {
  test("ValidationError", () => {
    try {
      const error = new ValidationError();
      throw error;
    } catch (error: any) {
      expect(error.errorCode).toBe(400);
    }
  });

  test("UnauthorizedError", () => {
    try {
      const error = new UnauthorizedError();
      throw error;
    } catch (error: any) {
      expect(error.errorCode).toBe(401);
    }
  });

  test("NotFoundError", () => {
    try {
      const error = new NotFoundError();
      throw error;
    } catch (error: any) {
      expect(error.errorCode).toBe(404);
    }
  });

  test("ServerError", () => {
    try {
      const error = new ServerError();
      throw error;
    } catch (error: any) {
      expect(error.errorCode).toBe(500);
    }
  });

  test("BadRequestError", () => {
    try {
      const error = new BadRequestError();
      throw error;
    } catch (error: any) {
      expect(error.errorCode).toBe(400);
    }
  });

  test("ConflictError", () => {
    try {
      const error = new ConflictError();
      throw error;
    } catch (error: any) {
      expect(error.errorCode).toBe(409);
    }
  });

  test("ForbiddenError", () => {
    try {
      const error = new ForbiddenError();
      throw error;
    } catch (error: any) {
      expect(error.errorCode).toBe(403);
    }
  });

  test("MethodNotAllowedError", () => {
    try {
      const error = new MethodNotAllowedError();
      throw error;
    } catch (error: any) {
      expect(error.errorCode).toBe(405);
    }
  });

  test("TooManyRequestsError", () => {
    try {
      const error = new TooManyRequestsError();
      throw error;
    } catch (error: any) {
      expect(error.errorCode).toBe(429);
    }
  });

  test("UnsupportedMediaTypeError", () => {
    try {
      const error = new UnsupportedMediaTypeError();
      throw error;
    } catch (error: any) {
      expect(error.errorCode).toBe(415);
    }
  });

  test("UnprocessableEntityError", () => {
    try {
      const error = new UnprocessableEntityError();
      throw error;
    } catch (error: any) {
      expect(error.errorCode).toBe(422);
    }
  });

  test("ServiceUnavailableError", () => {
    try {
      const error = new ServiceUnavailableError();
      throw error;
    } catch (error: any) {
      expect(error.errorCode).toBe(503);
    }
  });

  test("GatewayTimeoutError", () => {
    try {
      const error = new GatewayTimeoutError();
      throw error;
    } catch (error: any) {
      expect(error.errorCode).toBe(504);
    }
  });

  test("CustomError", () => {
    try {
      const customError = new CustomError("Test message", 432);
      throw customError;
    } catch (error: any) {
      expect(error.errorCode).toBe(432);
    }
  });
});

describe("BaseCustomError", () => {
  test("should create a new instance of BaseCustomError", () => {
    const error = new BaseCustomError("Test error message");
    expect(error).toBeInstanceOf(BaseCustomError);
  });

  test("should have a logTimestamp method", () => {
    const error = new BaseCustomError("Test error");
    expect(error.logTimestamp()).toMatch(
      /^Timestamp: \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/
    );
  });

  test("should have a formatErrorMessage method that returns a string", () => {
    const error = new BaseCustomError("Test error message");
    expect(typeof error.formatErrorMessage()).toBe("string");
  });

  test("should have a toJSON method that returns an object", () => {
    const error = new BaseCustomError("Test error message");
    expect(typeof error.toJSON()).toBe("object");
  });
});

describe("CustomError", () => {
  test("should create a new instance of CustomError", () => {
    const error = new CustomError("Test error message");
    expect(error).toBeInstanceOf(CustomError);
  });
  test("should create custom error instances", () => {
    const error = new customErrorClasses.BadRequestError("Test error");
    expect(error).toBeInstanceOf(BaseCustomError);
    expect(error).toBeInstanceOf(customErrorClasses.BadRequestError);
    expect(error.message).toBe("Test error");
    expect(error.errorCode).toBe(400);
    expect(error.data).toEqual({});
    expect(error.name).toBe("BadRequestError");
    expect(error.toJSON()).toEqual({
      name: "BadRequestError",
      message: "Test error",
      errorCode: 400,
      timestamp: expect.any(String),
      data: {},
    });
  });
  test("should handle invalid error definitions", () => {
    const invalidDefinitions = [
      { name: "InvalidError1", code: "not a number" },
      { name: "InvalidError2", code: 500, data: "not an object" },
    ];

    const originalConsoleError = console.error;
    console.error = jest.fn();

    try {
      for (const { name } of invalidDefinitions) {
        expect(customErrorClasses).not.toHaveProperty(name);
      }
    } finally {
      console.error = originalConsoleError;
    }
  });
});
