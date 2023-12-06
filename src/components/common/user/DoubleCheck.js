import { emailDBCheck, nicknameDoubleCheck } from "@/services/user";
import { JOIN_DOUBLE_CHECK } from "@/constant/document/auth";
const { FAILED, SUCCESS } = JOIN_DOUBLE_CHECK;
import { doubleCheck, doubleCheckError } from "@/utils/toast";

export const emailDoubleCheck = (email, setDoubleEmail) => {
  emailDBCheck(email)
    .then(() => {
      setDoubleEmail(true);
      doubleCheck(SUCCESS.EMAIL);
    })
    .catch((e) => {
      setDoubleEmail(false);
      doubleCheckError(FAILED.EMAIL);
      console.log(e);
    });
};

export const NameDoubleCheck = (name, setDoubleName) => {
  nicknameDoubleCheck(name)
    .then(() => {
      setDoubleName(true);
      doubleCheck(SUCCESS.NICKNAME);
    })
    .catch((e) => {
      setDoubleName(false);
      doubleCheckError(FAILED.NICKNAME);
    });
};
