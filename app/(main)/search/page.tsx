"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { VideoCard } from "@/components/shared/video-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { mockVideos } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setActiveQuery("");
  };

  // Filtrar videos basado en la búsqueda
  const filteredVideos = activeQuery
    ? mockVideos.filter(
        (video) =>
          video.title.toLowerCase().includes(activeQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(activeQuery.toLowerCase()) ||
          video.categoryName.toLowerCase().includes(activeQuery.toLowerCase())
      )
    : [];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Search Header */}
      <div className="mb-12 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Buscar Videos
        </h1>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por título, descripción o categoría..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-20 h-14 text-lg"
              autoFocus
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={clearSearch}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
          <Button type="submit" className="w-full mt-4" size="lg">
            Buscar
          </Button>
        </form>
      </div>

      {/* Results */}
      {activeQuery ? (
        <div>
          {/* Results Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-semibold">
                Resultados de búsqueda
              </h2>
              <Badge variant="secondary">
                {filteredVideos.length} {filteredVideos.length === 1 ? "resultado" : "resultados"}
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Mostrando resultados para: <span className="text-foreground font-medium">&quot;{activeQuery}&quot;</span>
            </p>
          </div>

          {/* Results Grid */}
          {filteredVideos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-muted-foreground mb-6">
                No pudimos encontrar videos que coincidan con &quot;{activeQuery}&quot;
              </p>
              <Button variant="outline" onClick={clearSearch}>
                Limpiar búsqueda
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Comienza a buscar
          </h3>
          <p className="text-muted-foreground">
            Ingresa un término de búsqueda para encontrar videos
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Cargando búsqueda...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
