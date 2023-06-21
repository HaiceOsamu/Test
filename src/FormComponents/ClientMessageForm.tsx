import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { dontShowCategoryMessage, fetchMessage } from "../dataBace";
import login from "../global";

function ClientMessageForm({
  selectMessagesId,
  setSelectMessagesId,
  refetch,
}: {
  selectMessagesId: number;
  setSelectMessagesId: React.Dispatch<React.SetStateAction<number>>;
  refetch: () => void;
}) {
  const message = fetchMessage(selectMessagesId as number);

  return (
    <>
      <Dialog open={Boolean(selectMessagesId)}>
        <DialogTitle>
          <IconButton
            onClick={() => setSelectMessagesId(0)}
            className="!absolute !top-0 !right-0"
          >
            <Close />
          </IconButton>
          <div className="mt-6">{message?.category} сообщение</div>
        </DialogTitle>
        <DialogContent>
          <span>Заголовок</span>
          <div className="h-2" />
          <span className=" font-medium">{message?.title}</span>
          <div className="h-6" />

          <span>Текст</span>
          <div className="h-2" />
          <span className=" font-medium">{message?.text}</span>

          <div className="h-2" />

          <div className="h-2" />
        </DialogContent>

        <Button
          className="!bg-blue-400"
          onClick={() => {
            dontShowCategoryMessage(
              selectMessagesId,
              login?.user?.id as number
            );
            refetch && refetch();
            setSelectMessagesId(0);
          }}
        >
          Не показывать {message?.category} сообщение
        </Button>
      </Dialog>
    </>
  );
}

export default ClientMessageForm;
