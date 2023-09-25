import { customErrorClasses } from "./src/customErrorClasses/customErrorClasses";
import { ErrorCodes } from "./src/constants/statusCodes";

function testingErrors() {
  const { ValidationError, UnauthorizedError } = customErrorClasses; // Destructure the classes you need

  try {
    if (true) {
      throw new UnauthorizedError(
        "You are unauthorised",
        ErrorCodes.IM_A_TEAPOT,
        {
          customData: "customData",
        }
      );
    }
  } catch (error) {
    console.log(error.errorCode);
  }
}
testingErrors();
