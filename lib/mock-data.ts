import { Video, Category } from "./types";

// Mock de categorías
export const mockCategories: Category[] = [
  { id: "1", name: "Acción", description: "Videos llenos de acción y adrenalina", videoCount: 45 },
  { id: "2", name: "Comedia", description: "Para reír sin parar", videoCount: 38 },
  { id: "3", name: "Drama", description: "Historias emocionantes", videoCount: 52 },
  { id: "4", name: "Ciencia Ficción", description: "Mundos futuristas", videoCount: 31 },
  { id: "5", name: "Documentales", description: "Aprende algo nuevo", videoCount: 27 },
  { id: "6", name: "Animación", description: "Para toda la familia", videoCount: 41 },
];

// Mock de videos
export const mockVideos: Video[] = [
  {
    id: "1",
    title: "El Gran Escape",
    description: "Una aventura épica llena de acción y emociones",
    thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=450&fit=crop",
    videoUrl: "/videos/1.mp4",
    duration: 7320, // 2h 2min
    categoryId: "1",
    categoryName: "Acción",
    views: 1250000,
    uploadDate: "2024-01-15",
    featured: true,
  },
  {
    id: "2",
    title: "Risas Garantizadas",
    description: "La comedia del año que no puedes perderte",
    thumbnailUrl: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800&h=450&fit=crop",
    videoUrl: "/videos/2.mp4",
    duration: 5400, // 1h 30min
    categoryId: "2",
    categoryName: "Comedia",
    views: 890000,
    uploadDate: "2024-01-20",
    featured: true,
  },
  {
    id: "3",
    title: "Viaje a las Estrellas",
    description: "Una odisea espacial que te dejará sin aliento",
    thumbnailUrl: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=450&fit=crop",
    videoUrl: "/videos/3.mp4",
    duration: 8100, // 2h 15min
    categoryId: "4",
    categoryName: "Ciencia Ficción",
    views: 2100000,
    uploadDate: "2024-02-01",
    featured: true,
  },
  {
    id: "4",
    title: "Secretos del Océano",
    description: "Explora las profundidades marinas",
    thumbnailUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=450&fit=crop",
    videoUrl: "/videos/4.mp4",
    duration: 3600, // 1h
    categoryId: "5",
    categoryName: "Documentales",
    views: 456000,
    uploadDate: "2024-02-10",
  },
  {
    id: "5",
    title: "Aventuras Animadas",
    description: "Diversión para toda la familia",
    thumbnailUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=450&fit=crop",
    videoUrl: "/videos/5.mp4",
    duration: 4500, // 1h 15min
    categoryId: "6",
    categoryName: "Animación",
    views: 3200000,
    uploadDate: "2024-02-15",
  },
  {
    id: "6",
    title: "Historias del Corazón",
    description: "Un drama que tocará tu alma",
    thumbnailUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=450&fit=crop",
    videoUrl: "/videos/6.mp4",
    duration: 6600, // 1h 50min
    categoryId: "3",
    categoryName: "Drama",
    views: 678000,
    uploadDate: "2024-02-20",
  },
  {
    id: "7",
    title: "Velocidad Extrema",
    description: "Carreras a alta velocidad",
    thumbnailUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=450&fit=crop",
    videoUrl: "/videos/7.mp4",
    duration: 5700, // 1h 35min
    categoryId: "1",
    categoryName: "Acción",
    views: 1890000,
    uploadDate: "2024-03-01",
  },
  {
    id: "8",
    title: "Comedia en la Ciudad",
    description: "Situaciones hilarantes en la gran ciudad",
    thumbnailUrl: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?w=800&h=450&fit=crop",
    videoUrl: "/videos/8.mp4",
    duration: 4800, // 1h 20min
    categoryId: "2",
    categoryName: "Comedia",
    views: 1123000,
    uploadDate: "2024-03-05",
  },
  {
    id: "9",
    title: "La Última Frontera",
    description: "Explorando galaxias desconocidas",
    thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop",
    videoUrl: "/videos/9.mp4",
    duration: 7800, // 2h 10min
    categoryId: "4",
    categoryName: "Ciencia Ficción",
    views: 2567000,
    uploadDate: "2024-03-10",
  },
  {
    id: "10",
    title: "Maravillas Naturales",
    description: "La belleza de nuestro planeta",
    thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop",
    videoUrl: "/videos/10.mp4",
    duration: 4200, // 1h 10min
    categoryId: "5",
    categoryName: "Documentales",
    views: 890000,
    uploadDate: "2024-03-15",
  },
];

// Función helper para obtener videos por categoría
export function getVideosByCategory(categoryId: string): Video[] {
  return mockVideos.filter(video => video.categoryId === categoryId);
}

// Función helper para obtener videos destacados
export function getFeaturedVideos(): Video[] {
  return mockVideos.filter(video => video.featured);
}

// Función helper para obtener videos populares
export function getPopularVideos(): Video[] {
  return [...mockVideos].sort((a, b) => b.views - a.views).slice(0, 10);
}

// Función helper para obtener videos recientes
export function getRecentVideos(): Video[] {
  return [...mockVideos].sort((a, b) =>
    new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
  ).slice(0, 10);
}
