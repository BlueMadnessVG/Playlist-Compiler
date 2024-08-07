import { TypeWithKey } from "../../models/type_with_key.model";

export const getValidationError = (errorCode: any) => {
  const codeMatcher: TypeWithKey<string> = {
    ERR_NETWORK: "ERROR GETTING THE INFORMATION, PLACE TRY LATER!!",
    ERR_BAD_REQUEST: "YOU'RE TOKEN EXPIRED, LOGIN AGAIN!!",
  };

  return codeMatcher[errorCode];
};
