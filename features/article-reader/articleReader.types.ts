import { FeedArticle } from "../feed/feed.types";

export type TagType = {
  name: string;
  slug: string;
};

export interface ArticleDetails extends FeedArticle {
  tags: TagType[];
  categories: TagType[];
  keyTakeaways: string[] | null;
  whyRead: string | null;
  bannerImg: string | null;
  isSaved: boolean;
}
