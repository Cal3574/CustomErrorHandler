const { errorDefinitions } = require("../constants/errorDefinitions");

class BaseCustomError extends Error {
  errorCode?: number;
  data: any;
  timestamp: string;

  constructor(message: string, errorCode?: number, data: any = {}) {
    super(message);
    this.name = this.constructor.name;
    this.errorCode = errorCode;
    this.timestamp = new Date().toISOString();
    this.data = data;
  }

  logTimestamp() {
    return `Timestamp: ${this.timestamp}`;
  }

  formatErrorMessage() {
    return `Error ${this.errorCode}: ${this.message}`;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      errorCode: this.errorCode,
      timestamp: this.timestamp,
      data: this.data,
    };
  }
}

class CustomError extends BaseCustomError {
  constructor(
    message: string,
    errorCode?: number,
    data: any = {},
    name?: string
  ) {
    super(message, errorCode, data);

    this.name = name || this.constructor.name;
  }
}

// Define custom error classes dynamically
const customErrorClasses: { [key: string]: any } = {};

try {
  for (const { name, code, data } of errorDefinitions) {
    if (typeof name !== "string" || typeof code !== "number") {
      // Handle invalid definitions or errors during class creation.
      console.error(`Invalid error definition for "${name}". Skipping.`);
      continue;
    }

    // Define a new custom error class that extends BaseCustomError
    class CustomErrorClass extends BaseCustomError {
      // Constructor for the custom error class
      constructor(message: string, errorCode?: number, customData?: any) {
        // Call the constructor of the parent class (BaseCustomError)
        super(message, errorCode || code, {
          ...data,
          ...customData,
        });

        // Set the name property of the custom error class to the error's name
        this.name = name;
      }
    }

    // Store the custom error class in an object with its name as the key
    customErrorClasses[name] = CustomErrorClass;
  }
} catch (error) {
  console.error("Error creating custom error classes:", error);
}

export { BaseCustomError, customErrorClasses, CustomError };
