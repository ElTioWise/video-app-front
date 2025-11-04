import { VideoCarousel } from "@/components/shared/video-carousel";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  mockVideos,
  getFeaturedVideos,
  getPopularVideos,
  getRecentVideos,
  getVideosByCategory,
} from "@/lib/mock-data";

export default function BrowsePage() {
  const featuredVideo = getFeaturedVideos()[0];
  const popularVideos = getPopularVideos();
  const recentVideos = getRecentVideos();
  const actionVideos = getVideosByCategory("1");
  const comedyVideos = getVideosByCategory("2");
  const sciFiVideos = getVideosByCategory("4");

  return (
    <div className="pb-8">
      {/* Hero Section - Featured Video */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={featuredVideo.thumbnailUrl}
            alt={featuredVideo.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full container mx-auto px-4 flex items-center">
          <div className="max-w-2xl space-y-6">
            {/* Badge */}
            <div className="inline-block">
              <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-md">
                Destacado
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl">
              {featuredVideo.title}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-200 drop-shadow-lg">
              {featuredVideo.description}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span className="font-semibold text-primary">
                {(featuredVideo.views / 1000000).toFixed(1)}M vistas
              </span>
              <span>•</span>
              <span>{featuredVideo.categoryName}</span>
              <span>•</span>
              <span>{Math.floor(featuredVideo.duration / 60)} min</span>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Link href={`/video/${featuredVideo.id}`}>
                <Button size="lg" className="gap-2">
                  <Play className="h-5 w-5 fill-current" />
                  Reproducir
                </Button>
              </Link>
              <Button size="lg" variant="secondary" className="gap-2">
                <Info className="h-5 w-5" />
                Más Información
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Carousels */}
      <section className="space-y-8 -mt-32 relative z-10">
        <VideoCarousel
          title="Populares en VideoStream"
          videos={popularVideos}
        />
        <VideoCarousel
          title="Agregados Recientemente"
          videos={recentVideos}
        />
        <VideoCarousel
          title="Acción y Aventura"
          videos={actionVideos}
          categoryId="1"
        />
        <VideoCarousel
          title="Comedia"
          videos={comedyVideos}
          categoryId="2"
        />
        <VideoCarousel
          title="Ciencia Ficción"
          videos={sciFiVideos}
          categoryId="4"
        />
      </section>
    </div>
  );
}
