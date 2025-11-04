"use client";

import { useParams } from "next/navigation";
import { VideoCard } from "@/components/shared/video-card";
import { Badge } from "@/components/ui/badge";
import { mockCategories, getVideosByCategory } from "@/lib/mock-data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id as string;

  const category = mockCategories.find((c) => c.id === categoryId);
  const videos = getVideosByCategory(categoryId);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Categoría no encontrada</h1>
        <p className="text-muted-foreground mb-8">
          La categoría que buscas no existe.
        </p>
        <Link href="/categories">
          <Button>Ver todas las categorías</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button */}
      <Link href="/categories">
        <Button variant="ghost" className="mb-8 gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver a Categorías
        </Button>
      </Link>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold">{category.name}</h1>
          <Badge variant="secondary" className="text-sm">
            {category.videoCount} videos
          </Badge>
        </div>
        {category.description && (
          <p className="text-lg text-muted-foreground">
            {category.description}
          </p>
        )}
      </div>

      {/* Videos Grid */}
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">
            No hay videos disponibles en esta categoría aún.
          </p>
        </div>
      )}
    </div>
  );
}
