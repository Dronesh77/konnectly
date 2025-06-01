export interface IUser {
  userId: string;
  userImage: string;
  firstName: string;
  lastName?: string;
  address?: string;
  education?: string;
  about?: string;
  shop?: {
    name: string;
    description: string;
    location: string;
    verified: boolean;
  };
  backgroundPhoto?: string;
  posts?: { text: string; date: string }[];
}
