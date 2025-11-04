import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockCategories, getVideosByCategory } from "@/lib/mock-data";
import { Film } from "lucide-react";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Categorías</h1>
        <p className="text-lg text-muted-foreground">
          Explora nuestra colección de videos organizados por categorías
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCategories.map((category) => {
          const categoryVideos = getVideosByCategory(category.id);
          const firstVideo = categoryVideos[0];

          return (
            <Link key={category.id} href={`/categories/${category.id}`}>
              <Card className="group overflow-hidden border-border hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                <CardContent className="p-0">
                  {/* Category Image */}
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    {firstVideo ? (
                      <Image
                        src={firstVideo.thumbnailUrl}
                        alt={category.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-secondary">
                        <Film className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                    {/* Video Count Badge */}
                    <Badge className="absolute top-4 right-4 bg-black/80 hover:bg-black/80">
                      {category.videoCount} videos
                    </Badge>
                  </div>

                  {/* Category Info */}
                  <div className="p-6 space-y-2">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
