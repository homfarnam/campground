export interface CampBase {
  title: string;
  price: number;
  desc: string;
  imgUrl?: string;
  location: string;
  star?: number;
  hasReview: boolean;
}

export interface Camp extends CampBase {
  _id: string;
  auhtor: string;
}
export interface CampData extends CampBase {
  id: string;
  author: {
    nickname?: string;
    email: string;
    id: string;
  };
}
