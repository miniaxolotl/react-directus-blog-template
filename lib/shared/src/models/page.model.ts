//***********************************************
//* page.model.ts
//***********************************************

import { BaseCoverImage } from "./shared.model";

export type BaseGlobalPage = {
  title: string;
  description?: string;
  date_created?: string;
  date_updated?: string;
};

export type BasePage = BaseCoverImage & {
  heading: string;
  subheading?: string;
  content: string;
  date_created?: string;
  date_updated?: string;
};
