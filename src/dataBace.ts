let users = [
  {
    id: 1,
    firstName: "Vladimir",
    lastName: "Maystruk",
    email: "admin@gmail.com",
    password: "1111",
    role: "admin",
    dontShow: "",
  },
  {
    id: 2,
    firstName: "Vladimir",
    lastName: "Maystruk 1",
    email: "client1@gmail.com",
    password: "1111",
    role: "client",
    dontShow: "",
  },
  {
    id: 3,
    firstName: "Vladimir",
    lastName: "Maystruk 2",
    email: "client2@gmail.com",
    password: "1111",
    role: "client",
    dontShow: "",
  },
  {
    id: 4,
    firstName: "Vladimir",
    lastName: "Maystruk 3",
    email: "client3@gmail.com",
    password: "1111",
    role: "client",
    dontShow: "",
  },
];

export interface IMessage {
  id: number;
  clientId: number;
  category: string;
  title: string;
  text: string;
  ts: string;
  numberViews: number;
}

let messages = [
  {
    id: 1,
    clientId: 2,
    category: "Приветственное",
    title: "Вам привет",
    text: "От меня",
    ts: "2023-06-20",
    numberViews: 1,
  },
  {
    id: 2,
    clientId: 3,
    category: "Рекламное",
    title: "Купите",
    text: "Автомобиль",
    ts: "2023-06-20",
    numberViews: 0,
  },
  {
    id: 3,
    clientId: 2,
    category: "Рекламное",
    title: "Отремонтируйте",
    text: "Стиральную машину",
    ts: "2023-06-20",
    numberViews: 0,
  },
  {
    id: 4,
    clientId: 2,
    category: "Почтовое",
    title: "Вам письмо",
    text: "От меня",
    ts: "2023-06-20",
    numberViews: 0,
  },
];

export const logins = (email: string, password: string) => {
  const findUser = users.find((user) => user.email === email);

  if (findUser) {
    const userPassword = findUser?.password === password;
    if (userPassword) {
      return findUser;
    }
    return "Не верный пароль";
  }
  return "Клиент не зарегистрирован";
};

export const fetchClients = () => {
  return users
    ?.filter((user) => user?.role === "client")
    ?.sort((a, b) => (a?.id < b?.id ? -1 : 1));
};

export const fetchMessages = (clientId: number) => {
  return messages
    ?.filter((message) => message?.clientId === clientId)
    ?.sort((a, b) => (a?.id < b?.id ? -1 : 1));
};

export const fetchClientsMessages = (clientId: number) => {
  const user = users?.find((u) => u?.id === clientId);
  return messages
    ?.filter(
      (message) =>
        message?.clientId === clientId &&
        !user?.dontShow?.includes(message?.category)
    )
    ?.sort((a, b) => (a?.id < b?.id ? -1 : 1));
};

export const fetchMessage = (messagesId: number) => {
  return messages?.find((m) => m?.id === messagesId);
};

export const createMessage = (clientId: number, payload: any) => {
  let maxId = 0;
  messages?.forEach((message) => {
    if (message?.id >= maxId) {
      maxId = message?.id + 1;
    }
  });
  messages?.push({
    id: maxId,
    clientId: clientId,
    category: payload?.category,
    title: payload?.title,
    text: payload?.text,
    ts: new Date().toISOString(),
    numberViews: 0,
  });
};

export const editMessage = (messagesId: number, payload: any) => {
  let message = messages?.find((m) => m?.id === messagesId);

  if (message) {
    message = {
      ...message,
      title: payload?.title,
      category: payload?.category,
      text: payload?.text,
    };

    messages = messages?.filter((m) => m?.id !== messagesId);
    messages?.push(message);
  }
};

export const deleteMessage = (messagesId: number) => {
  messages = messages?.filter((m) => m?.id !== messagesId);
};

export const countOpenMessage = (messagesId: number) => {
  let message = messages?.find((m) => m?.id === messagesId);

  if (message) {
    message = {
      ...message,
      numberViews: message?.numberViews + 1,
    };

    messages = messages?.filter((m) => m?.id !== messagesId);
    messages?.push(message);
  }
};

export const dontShowCategoryMessage = (
  messagesId: number,
  clientId: number
) => {
  let message = messages?.find((m) => m?.id === messagesId);
  let client = users?.find((m) => m?.id === clientId);

  const dontShowMessage = client?.dontShow ? client?.dontShow?.split(", ") : [];
  dontShowMessage.push(message?.category as string);

  console.log(dontShowMessage);

  if (message && client) {
    client = {
      ...client,
      dontShow: dontShowMessage?.join(", "),
    };

    users = users?.filter((u) => u?.id !== clientId);
    users?.push(client);
  }
};
