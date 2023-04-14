//***********************************************
//* blog_post.model.ts
//***********************************************

import { BaseCoverImage } from "./shared.model";

export type BaseBlogPost = BaseCoverImage & {
  id: string;
  title: string;
  content: string;
  content_preview: string;
  date_created?: string;
  date_updated?: string;
};
