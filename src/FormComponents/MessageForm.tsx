import { Button, FormHelperText } from "@material-ui/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  IMessage,
  createMessage,
  editMessage,
  fetchMessage,
} from "../dataBace";
import MySelect from "./MySelect";
import MyTextField from "./MyTextField";

function MessageForm({
  selectMessagesId,
  setSelectMessagesId,
  refetch,
  selectClientId,
  setShowCreateMessage,
}: {
  selectMessagesId?: number;
  selectClientId?: number;
  setSelectMessagesId?: React.Dispatch<React.SetStateAction<number>>;
  setShowCreateMessage?: React.Dispatch<React.SetStateAction<boolean>>;
  refetch?: () => void;
}) {
  const form = useForm({
    defaultValues: {
      title: "",
      text: "",
      category: "",
    },
  });

  const { handleSubmit, formState, control, reset } = form;

  useEffect(() => {
    let message: IMessage | undefined;
    if (selectMessagesId) {
      message = fetchMessage(selectMessagesId);

      reset({
        title: message?.title || "",
        text: message?.text || "",
        category: message?.category || "",
      });
    }
  }, [reset, selectMessagesId]);

  const editMassage = (value) => {
    if (selectMessagesId) {
      editMessage(selectMessagesId, value);
      setSelectMessagesId(0);
      refetch && refetch();
    }
  };

  const createMassage = (value) => {
    if (selectClientId) {
      createMessage(selectClientId, value);
      setShowCreateMessage(false);
      refetch && refetch();
    }
  };

  return (
    <>
      <MySelect
        label="Category"
        control={form.control}
        name="category"
        options={[
          { label: "Приветственное", value: "Приветственное" },
          { label: "Рекламное", value: "Рекламное" },
          { label: "Почтовое", value: "Почтовое" },
        ]}
        fullWidth
        rules={{
          required: true,
        }}
      />

      {formState?.errors?.category?.type === "required" && (
        <FormHelperText error>Field is required</FormHelperText>
      )}

      <div className="h-2" />

      <MyTextField
        maxlength="20"
        control={control}
        name="title"
        label="Заголовок*"
        rules={{
          required: true,
        }}
      />

      {formState?.errors?.title?.type === "required" && (
        <FormHelperText error>Field is required</FormHelperText>
      )}

      <div className="h-2" />

      <MyTextField
        control={control}
        name="text"
        label="Сообщение*"
        multiline
        rules={{
          required: true,
        }}
      />

      {formState?.errors?.text?.type === "required" && (
        <FormHelperText error>Field is required</FormHelperText>
      )}

      <div className="h-2" />

      <Button
        onClick={
          selectMessagesId
            ? handleSubmit(editMassage)
            : handleSubmit(createMassage)
        }
        className="!bg-blue-400"
      >
        {selectMessagesId ? "Редактировать" : "Отправить"}
      </Button>
    </>
  );
}

export default MessageForm;
