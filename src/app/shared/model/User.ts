export interface User{
  id?: number;
  username: string;
  password: string;
  roles?: Role[];
  [key: string]: any;

}

export interface Role{
  id?: number;
  type: string;
}
