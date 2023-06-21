import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useState } from "react";
import MessageForm from "./FormComponents/MessageForm";
import {
  IMessage,
  deleteMessage,
  fetchClients,
  fetchMessages,
} from "./dataBace";
import login, { IUser } from "./global";

function AdminForm({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const clients: IUser[] = fetchClients();
  const [selectClientId, setSelectClientId] = useState(0);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [selectMessagesId, setSelectMessagesId] = useState<number>(0);
  const [showCreateMessage, setShowCreateMessage] = useState<boolean>(false);

  const messageMap = messages?.map((message) => {
    return (
      <div
        key={message?.id}
        className="flex justify-center cursor-pointer mb-2"
      >
        <div className="grid grid-cols-2 gap-2 items-center">
          <div onClick={() => setSelectMessagesId(message?.id)}>
            {message?.title}
            {message?.numberViews !== 0 && `(${message?.numberViews})`}
          </div>
          <Button
            onClick={() => {
              deleteMessage(message?.id);
              setMessages(fetchMessages(selectClientId));
            }}
            className="!bg-blue-400 "
          >
            <span className="text-sm">Удалить</span>
          </Button>
        </div>
      </div>
    );
  });

  const clientsMap = clients?.map((client) => (
    <div key={client?.id} className="flex flex-col">
      <div
        className="flex justify-center cursor-pointer mb-4"
        onClick={() => {
          if (selectClientId === client?.id) {
            setSelectClientId(0);
            setMessages([]);
          } else {
            setSelectClientId(client?.id as number);
            setMessages(fetchMessages(client?.id as number));
          }
        }}
      >
        {client?.firstName} {client?.lastName}
      </div>
      {selectClientId === client?.id && (
        <>
          {messages?.length !== 0 ? (
            <div>{messageMap}</div>
          ) : (
            <div className="flex justify-center">
              <span>Сообщений нет</span>
            </div>
          )}
          <div className="flex justify-center">
            <Button
              className="!bg-blue-400"
              onClick={() => setShowCreateMessage(true)}
            >
              +
            </Button>
          </div>
        </>
      )}
    </div>
  ));

  return (
    <div className="p-8">
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
      <div className="mx-auto p-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {clientsMap}
      </div>

      {!!selectMessagesId && (
        <Dialog open={Boolean(selectMessagesId)}>
          <DialogTitle>
            <IconButton
              onClick={() => setSelectMessagesId(0)}
              className="!absolute !top-0 !right-0"
            >
              <Close />
            </IconButton>
            <div className="mt-6">Редактирование сообщения</div>
          </DialogTitle>
          <DialogContent>
            <MessageForm
              selectMessagesId={selectMessagesId}
              setSelectMessagesId={setSelectMessagesId}
              refetch={() => setMessages(fetchMessages(selectClientId))}
            />
          </DialogContent>
        </Dialog>
      )}

      {showCreateMessage && (
        <Dialog open={showCreateMessage}>
          <DialogTitle>
            <IconButton
              onClick={() => setShowCreateMessage(false)}
              className="!absolute !top-0 !right-0"
            >
              <Close />
            </IconButton>
            <div className="mt-6">Отправить новое сообщения</div>
          </DialogTitle>
          <DialogContent>
            <MessageForm
              selectClientId={selectClientId}
              setShowCreateMessage={setShowCreateMessage}
              refetch={() => setMessages(fetchMessages(selectClientId))}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default AdminForm;
