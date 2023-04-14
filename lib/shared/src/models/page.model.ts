//***********************************************
//* page.model.ts
//***********************************************

import { BaseCoverImage } from "./shared.model";

export type BasePage = BaseCoverImage & {
  heading: string;
  subheading?: string;
  content: string;
  date_created?: string;
  date_updated?: string;
};
