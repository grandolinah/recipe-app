export interface RecipeItemProps {
  title: string;
  image?: string;
  video?: string;
  author: string;
  description: string;
  authorable?: boolean;
  onClickFavoriteHandler?(): void;
  onClickDetailsHandler?(): void;
  onClickEditHandler?(): void;
  onClickDeleteHandler?(): void;
}
