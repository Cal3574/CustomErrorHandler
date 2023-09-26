import { ErrorCodes } from "./src/constants/statusCodes";
import {
  CustomError,
  customErrorClasses,
} from "./src/customErrorClasses/customErrorClasses";

function testingErrors() {
  const { ValidationError, UnauthorizedError } = customErrorClasses; // Destructure the classes you need

  try {
    if (true) {
      // throw new UnauthorizedError(
      //   "You are not authorised",
      //   ErrorCodes.IM_A_TEAPOT,
      //   {
      //     customData: "customData",
      //   },
      //   {
      //     customMethod: () => {
      //       return 1 + 1;
      //     },
      //   }
      // );
      throw new ValidationError("hey");
    }
  } catch (error: any) {
    console.log(error.toJSON());
    // console.log(error.toJSON()); // Execute the custom method
    // centralizedErrorMiddleware(error);
  }
}

testingErrors();
