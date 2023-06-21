import { Button } from "@material-ui/core";
import { useState } from "react";
import ClientMessageForm from "./FormComponents/ClientMessageForm";
import { countOpenMessage, fetchClientsMessages } from "./dataBace";
import login from "./global";

function ClientForm({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  let messages = fetchClientsMessages(login?.user?.id as number);
  console.log(login?.user);
  const [showMessage, setShowMessage] = useState(false);
  const [selectMessagesId, setSelectMessagesId] = useState<number>(0);

  const messageMap = messages?.map((message) => {
    return (
      <div
        key={message?.id}
        className="flex justify-center cursor-pointer mb-2"
      >
        <span
          onClick={() => {
            setSelectMessagesId(message?.id);
            countOpenMessage(message?.id);
          }}
          className={message?.numberViews === 0 ? "font-bold" : ""}
        >
          {message?.title}
        </span>
      </div>
    );
  });

  return (
    <div className="p-8 h-screen relative">
      <div className="absolute top-2 right-2">
        <Button className="!bg-blue-400" onClick={() => setStep(1)}>
          Выход
        </Button>
      </div>
      <h1 className="text-center mb-6">
        Здравствуйте{" "}
        <b>
          {login?.user?.firstName} {login?.user?.lastName}
        </b>
      </h1>

      <Button
        className="!absolute !bottom-8 !left-1/2 !w-10 !h-10 !bg-blue-600"
        onClick={() => {
          setShowMessage(true);
        }}
      >
        <span className="text-red-500 font-bold text-3xl">
          {messages?.length}
        </span>
      </Button>

      {showMessage && messages?.length !== 0 && <>{messageMap}</>}

      {!!selectMessagesId && (
        <ClientMessageForm
          selectMessagesId={selectMessagesId}
          setSelectMessagesId={setSelectMessagesId}
          refetch={() =>
            (messages = fetchClientsMessages(login?.user?.id as number))
          }
        />
      )}
    </div>
  );
}

export default ClientForm;
