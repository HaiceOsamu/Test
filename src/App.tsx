import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AdminForm from "./AdminForm";
import ClientForm from "./ClientForm";
import MyTextField from "./FormComponents/MyTextField";
import { logins } from "./dataBace";
import login from "./global";

interface IAuthorizationForm {
  email: string;
  password: string;
}

function App() {
  const form = useForm<IAuthorizationForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [step, setStep] = useState<number>(1);

  const { handleSubmit, formState, control } = form;

  const authorization = (values: IAuthorizationForm) => {
    setLoading(true);
    const data = logins(values?.email, values?.password);

    if (data?.id) {
      login.user = data;
      setStep(2);
    } else {
      setError(data as string);
    }
    setLoading(false);
  };

  return (
    <>
      {step === 1 && (
        <div className="absolute w-full h-screen bg-gradient-to-l from-red-600 to-blue-600 flex justify-center items-center">
          <div className="max-w-[30rem] w-full bg-white flex flex-col p-8">
            <h2 className="text-center text-3xl font-medium">Авторизация</h2>

            <MyTextField
              control={control}
              name="email"
              label="Логин*"
              rules={{
                required: true,
              }}
            />

            {formState?.errors?.email?.type === "required" && (
              <FormHelperText error>Field is required</FormHelperText>
            )}

            <div className="h-2" />

            <MyTextField
              control={control}
              name="password"
              label="Пароль*"
              type="password"
              rules={{
                required: true,
              }}
            />

            {formState?.errors?.password?.type === "required" && (
              <FormHelperText error>Field is required</FormHelperText>
            )}

            <div className="h-4" />

            <Button
              onClick={handleSubmit(authorization)}
              disabled={loading}
              className="!bg-blue-400"
            >
              Войти
              {loading ? (
                <CircularProgress
                  size={24}
                  className="text-main absolute top-1/2 left-1/2 -mt-3 -ml-3"
                />
              ) : null}
            </Button>
          </div>

          <Dialog open={Boolean(error)}>
            <DialogTitle>
              <IconButton
                onClick={() => setError("")}
                className="!absolute !top-0 !right-0"
              >
                <Close />
              </IconButton>
              <div className="mt-6">Вы не можете войти под данным клиентом</div>
            </DialogTitle>
            <DialogContent>
              <div className="w-full flex justify-center mb-4">{error}</div>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {step === 2 && login?.user?.role === "client" && (
        <ClientForm setStep={setStep} />
      )}

      {step === 2 && login?.user?.role === "admin" && (
        <AdminForm setStep={setStep} />
      )}
    </>
  );
}

export default App;
