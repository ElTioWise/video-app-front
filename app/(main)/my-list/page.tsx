"use client";

import { VideoCard } from "@/components/shared/video-card";
import { Badge } from "@/components/ui/badge";
import { mockVideos } from "@/lib/mock-data";
import { Heart } from "lucide-react";

export default function MyListPage() {
  // TODO: Implementar lógica real de "Mi Lista" con estado del usuario
  // Por ahora mostramos algunos videos de ejemplo
  const myListVideos = mockVideos.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <Heart className="h-6 w-6 text-primary fill-primary" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">Mi Lista</h1>
          </div>
          <Badge variant="secondary" className="text-sm">
            {myListVideos.length} videos
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Tus videos guardados para ver más tarde
        </p>
      </div>

      {/* Videos Grid */}
      {myListVideos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myListVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
            <Heart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Tu lista está vacía
          </h3>
          <p className="text-muted-foreground">
            Agrega videos a tu lista para verlos más tarde
          </p>
        </div>
      )}
    </div>
  );
}
