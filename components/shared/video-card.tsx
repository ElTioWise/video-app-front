"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Clock, Eye, Plus, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video } from "@/lib/types";
import { useState } from "react";

interface VideoCardProps {
  video: Video;
  priority?: boolean;
}

export function VideoCard({ video, priority = false }: VideoCardProps) {
  const [isInList, setIsInList] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
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

  const toggleList = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsInList(!isInList);
  };

  return (
    <Link href={`/video/${video.id}`}>
      <Card
        className="group relative overflow-hidden border-none bg-card transition-all duration-300 hover:scale-105 hover:ring-2 hover:ring-primary"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          {/* Thumbnail */}
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            <Image
              src={video.thumbnailUrl}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              priority={priority}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-primary p-3 transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-8 w-8 text-primary-foreground fill-primary-foreground" />
                </div>
              </div>
            </div>

            {/* Duration Badge */}
            <Badge className="absolute bottom-2 right-2 bg-black/80 text-white hover:bg-black/80">
              <Clock className="mr-1 h-3 w-3" />
              {formatDuration(video.duration)}
            </Badge>

            {/* Featured Badge */}
            {video.featured && (
              <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                Destacado
              </Badge>
            )}

            {/* Add to List Button */}
            {isHovered && (
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                onClick={toggleList}
              >
                {isInList ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>

          {/* Info */}
          <div className="p-3 space-y-2">
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {video.title}
            </h3>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {formatViews(video.views)} vistas
              </span>
              <span>•</span>
              <span>{video.categoryName}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
