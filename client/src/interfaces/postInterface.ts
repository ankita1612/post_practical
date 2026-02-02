export interface IPost {
  _id:string;
  title: string;
  content:string,
  username: string;
  createdAt: Date;
  tags:string[];
}
