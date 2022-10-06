export interface IDataType {
  id?: number;
  name?: string;
  username?: string;
  password?: string;
}
export interface IRowDataType {
  name?: string | any;
  email?: string;
  phone?: string;
  id?: string | number | any;
  userId?: string | number |any;
}

export interface IDataModalType {
  show?: boolean;
  onHide?: VoidFunction;
  data?: string | any;
}
