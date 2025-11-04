export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number; // en segundos
  categoryId: string;
  categoryName: string;
  views: number;
  uploadDate: string;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  videoCount: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  myList: string[]; // IDs de videos
}

export interface VideoCarouselSection {
  title: string;
  videos: Video[];
  categoryId?: string;
}
