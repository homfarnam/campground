export interface ReviewBase {
  readonly camp: string;
  readonly title: string;
  readonly star: string;
  readonly content: string;
}

export interface Review extends ReviewBase {
  _id: string;
  author: string;
}

interface Author {
  nickname: string;
  id: string;
}

export interface CampReview extends ReviewBase {
  id: string;
  author: Author;
}
