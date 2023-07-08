export interface MenuGet {
  menuId: string;
  publishDate: Date;
  editDate: Date;
  description: string;
  user: { id: string };
}

export interface MenuPost {
  publishDate: Date;
  editDate: Date;
  description: string;
  userId: string;
}

export interface MenuPut {
  menuId: string;
  publishDate: Date;
  editDate: Date;
  description: string;
  userId: string;
}
