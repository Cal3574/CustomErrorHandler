import { errorDefinitions } from "../constants/errorDefinitions";

class BaseCustomError extends Error {
  errorCode?: number; // Declare the 'errorCode' property with optional type
  data: any; // Declare the 'data' property
  timestamp: string; // Declare the 'timestamp' property

  constructor(message: string, errorCode: number, data: any = {}) {
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

  logError() {
    console.error(`[${this.timestamp}] ${this.formatErrorMessage()}`);
  }
}

class CustomError extends BaseCustomError {
  constructor(
    message: string,
    errorCode: number,
    data: any = {},
    name?: string
  ) {
    super(message, errorCode, data);

    this.name = name || this.constructor.name;
  }
}
//

// Define custom error classes dynamically
const customErrorClasses: { [key: string]: any } = {};

// Iterate through each error definition in the errorDefinitions array
for (const { name, code, data } of errorDefinitions) {
  // Define a new custom error class that extends BaseCustomError
  class CustomErrorClass extends BaseCustomError {
    // Constructor for the custom error class
    constructor(message: string, errorCode: number, customData?: any) {
      // Call the constructor of the parent class (BaseCustomError)
      super(message, errorCode ? errorCode : code, { ...data, ...customData });

      // Set the name property of the custom error class to the error's name
      this.name = name;
    }
  }

  // Store the custom error class in an object with its name as the key
  customErrorClasses[name] = CustomErrorClass;
}
export { BaseCustomError, customErrorClasses, CustomError };
