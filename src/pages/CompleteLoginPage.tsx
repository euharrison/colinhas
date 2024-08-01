import { useEffect } from "react";
import { completeLoginWithEmail } from "../auth/loginWithEmail";
import { LoadingPage } from "../components/LoadingPage";
import { alert } from "../services/alert";
import { dismissAll } from "../services/navigation";
import { supportEmail } from "../urls";

export const CompleteLoginPage = () => {
  useEffect(() => {
    completeLoginWithEmail()
      .catch(() => {
        alert(
          `Login falhou. \nPor favor tente novamente ou entre em contato pelo email ${supportEmail}`,
        );
      })
      .finally(() => {
        dismissAll();
      });
  }, []);

  return <LoadingPage />;
};
