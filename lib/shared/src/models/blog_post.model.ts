//***********************************************
//* blog_post.model.ts
//***********************************************

import { BaseCoverImage, BaseUser } from ".";

export type BaseBlogPost = BaseCoverImage & {
  id: string;
  title: string;
  content: string;
  content_preview: string;
  user_created: BaseUser;
  date_created: string;
  date_updated: string;
};
