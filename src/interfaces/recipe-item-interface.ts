export interface RecipeItemProps {
  title: string;
  image?: string;
  video?: string;
  author: string;
  description: string;
  onClickHandler(): void;
  authorable?: boolean;
  onClickEditHandler?(): void;
  onClickDeleteHandler?(): void;
}
