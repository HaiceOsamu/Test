import { store } from "@risingstack/react-easy-state";

export interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: string;
}

interface ILogin {
  user: IUser;
}

const login = store<ILogin>({
  user: {},
});

export default login;
