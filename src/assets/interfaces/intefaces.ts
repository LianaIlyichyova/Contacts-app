import { ReactNode } from "react";

export interface IDataType {
  id?: string;
  name?: string;
  username?: string;
  password?: string;
}
export interface IRowDataType {
  name?: string | any;
  email?: string;
  phone?: string;
  id?: string;
  userId?: string;
}

export interface IDataModalType {
  show?: boolean;
  onHide?: VoidFunction;
  data?: string | ReactNode;
}
