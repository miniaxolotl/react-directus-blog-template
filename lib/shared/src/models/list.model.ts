//***********************************************
//* list.model.ts
//***********************************************

import { BaseCoverImage } from "./shared.model";

export type BaseList = {
  id: string;
  list_items: BaseListItem[];
  date_created?: string;
  date_updated?: string;
};

export type BaseListItem = BaseCoverImage & {
  id: string;
  title: string;
  content: string;
  content_preview: string;
  date_created?: string;
  date_updated?: string;
};
