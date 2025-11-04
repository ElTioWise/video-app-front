"use client";

import { useParams } from "next/navigation";
import { ThumbsUp, ThumbsDown, Share2, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { VideoCarousel } from "@/components/shared/video-carousel";
import { Badge } from "@/components/ui/badge";
import { mockVideos, getRecentVideos } from "@/lib/mock-data";
import { useState } from "react";

export default function VideoPage() {
  const params = useParams();
  const videoId = params.id as string;

  const video = mockVideos.find((v) => v.id === videoId);
  const recommendedVideos = getRecentVideos().filter((v) => v.id !== videoId);

  const [isInList, setIsInList] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);

  if (!video) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Video no encontrado</h1>
        <p className="text-muted-foreground">El video que buscas no existe.</p>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }
    return `${minutes} min`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <div className="pb-12">
      {/* Video Player Section */}
      <section className="w-full bg-black">
        <div className="container mx-auto">
          <div className="aspect-video w-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
            {/* TODO: Integrar reproductor de video real */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-0 h-0 border-l-[20px] border-l-primary border-y-[12px] border-y-transparent ml-2" />
              </div>
              <p className="text-white text-lg">Reproductor de Video</p>
              <p className="text-muted-foreground text-sm">
                Aquí se integrará el reproductor con streaming por partes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Info Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Title and Category */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="secondary">{video.categoryName}</Badge>
              {video.featured && (
                <Badge className="bg-primary">Destacado</Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{video.title}</h1>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {formatViews(video.views)} vistas
            </span>
            <span>•</span>
            <span>{formatDate(video.uploadDate)}</span>
            <span>•</span>
            <span>{formatDuration(video.duration)}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <div className="flex gap-2 bg-secondary rounded-full p-1">
              <Button
                size="sm"
                variant={liked === true ? "default" : "ghost"}
                className="rounded-full gap-2"
                onClick={() => setLiked(liked === true ? null : true)}
              >
                <ThumbsUp className="h-4 w-4" />
                Me gusta
              </Button>
              <Button
                size="sm"
                variant={liked === false ? "default" : "ghost"}
                className="rounded-full gap-2"
                onClick={() => setLiked(liked === false ? null : false)}
              >
                <ThumbsDown className="h-4 w-4" />
                No me gusta
              </Button>
            </div>

            <Button
              size="sm"
              variant="secondary"
              className="rounded-full gap-2"
              onClick={() => setIsInList(!isInList)}
            >
              {isInList ? (
                <>
                  <Check className="h-4 w-4" />
                  En mi lista
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  Agregar a mi lista
                </>
              )}
            </Button>

            <Button
              size="sm"
              variant="secondary"
              className="rounded-full gap-2"
            >
              <Share2 className="h-4 w-4" />
              Compartir
            </Button>
          </div>

          <Separator />

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Descripción</h2>
            <p className="text-muted-foreground leading-relaxed">
              {video.description}
            </p>
          </div>

          <Separator />

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Categoría
              </h3>
              <p className="text-foreground">{video.categoryName}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Duración
              </h3>
              <p className="text-foreground">{formatDuration(video.duration)}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Fecha de publicación
              </h3>
              <p className="text-foreground">{formatDate(video.uploadDate)}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                Visualizaciones
              </h3>
              <p className="text-foreground">
                {video.views.toLocaleString("es-ES")} vistas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Videos */}
      <section className="mt-12">
        <VideoCarousel
          title="Videos Recomendados"
          videos={recommendedVideos}
        />
      </section>
    </div>
  );
}
