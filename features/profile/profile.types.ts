export type ProfileInterest = {
  name: string;
  slug: string;
};

export type ProfileStats = {
  saved: number;
  interests: number;
  following: number;
};

export type ProfileUser = {
  name: string;
  email: string;
  image: string | null;
  about: string | null;
  experienceLevel: string | null;
  createdAt: Date | string | null;
};

export type ProfileData = {
  user: ProfileUser | null;
  interests: ProfileInterest[];
  tags: string[];
  allCategories: ProfileInterest[];
  stats: ProfileStats;
};

export type ProfileInput = {
  name: string;
  about: string;
  experienceLevel: "junior" | "mid" | "senior";
};

export type ProfileSelectionsInput = {
  interests: string[];
  tags: string[];
};
