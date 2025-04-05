export interface Game {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  rating: number;
  platforms: string[];
  releaseDate?: string;
  description?: string;
  installUrl?: string;
}