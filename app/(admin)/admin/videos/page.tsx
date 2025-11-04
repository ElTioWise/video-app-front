"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Search, Pencil, Trash2, Upload, Eye } from "lucide-react";
import { mockVideos, mockCategories } from "@/lib/mock-data";
import { toast } from "sonner";
import Link from "next/link";

export default function VideosManagement() {
  const [videos, setVideos] = useState(mockVideos);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    videoFile: null as File | null,
    thumbnailFile: null as File | null,
    featured: false,
  });

  // Filter videos
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    video.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateVideo = () => {
    // TODO: Implementar lógica de creación con backend
    toast.success("Video creado exitosamente", {
      description: "El video ha sido agregado al catálogo",
    });
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleDeleteVideo = (videoId: string) => {
    // TODO: Implementar lógica de eliminación
    setVideos(videos.filter((v) => v.id !== videoId));
    toast.success("Video eliminado", {
      description: "El video ha sido eliminado del catálogo",
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      categoryId: "",
      videoFile: null,
      thumbnailFile: null,
      featured: false,
    });
    setEditingVideo(null);
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestión de Videos</h1>
          <p className="text-muted-foreground">
            Administra el catálogo de videos
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Nuevo Video
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Subir Nuevo Video</DialogTitle>
              <DialogDescription>
                Completa la información del video que deseas subir
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Título del Video</Label>
                <Input
                  id="title"
                  placeholder="Ej: El Gran Escape"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Describe el contenido del video..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCategories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Video File */}
              <div className="space-y-2">
                <Label htmlFor="video">Archivo de Video</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-1">
                    Click para seleccionar o arrastra el video aquí
                  </p>
                  <p className="text-xs text-muted-foreground">
                    MP4, WebM, MOV (máx. 2GB)
                  </p>
                  <Input
                    id="video"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => setFormData({ ...formData, videoFile: e.target.files?.[0] || null })}
                  />
                </div>
                {formData.videoFile && (
                  <p className="text-sm text-primary">
                    Archivo seleccionado: {formData.videoFile.name}
                  </p>
                )}
              </div>

              {/* Thumbnail */}
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Miniatura</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-1">
                    Click para seleccionar la imagen de miniatura
                  </p>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG (1920x1080 recomendado)
                  </p>
                  <Input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setFormData({ ...formData, thumbnailFile: e.target.files?.[0] || null })}
                  />
                </div>
                {formData.thumbnailFile && (
                  <p className="text-sm text-primary">
                    Imagen seleccionada: {formData.thumbnailFile.name}
                  </p>
                )}
              </div>

              {/* Featured */}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="featured">Video Destacado</Label>
                  <p className="text-sm text-muted-foreground">
                    Aparecerá en la sección de destacados
                  </p>
                </div>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreateVideo}>
                Subir Video
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Videos</CardDescription>
            <CardTitle className="text-3xl">{videos.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Destacados</CardDescription>
            <CardTitle className="text-3xl">
              {videos.filter((v) => v.featured).length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Vistas</CardDescription>
            <CardTitle className="text-3xl">
              {(videos.reduce((acc, v) => acc + v.views, 0) / 1000000).toFixed(1)}M
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Duración Total</CardDescription>
            <CardTitle className="text-3xl">
              {Math.round(videos.reduce((acc, v) => acc + v.duration, 0) / 3600)}h
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Videos</CardTitle>
              <CardDescription>Gestiona todos los videos del catálogo</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Video</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Vistas</TableHead>
                <TableHead>Duración</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVideos.map((video) => (
                <TableRow key={video.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-10 bg-muted rounded flex-shrink-0" />
                      <div>
                        <p className="font-medium">{video.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {video.uploadDate}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{video.categoryName}</Badge>
                  </TableCell>
                  <TableCell>{(video.views / 1000).toFixed(0)}K</TableCell>
                  <TableCell>{formatDuration(video.duration)}</TableCell>
                  <TableCell>
                    <Badge variant={video.featured ? "default" : "secondary"}>
                      {video.featured ? "Destacado" : "Normal"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/video/${video.id}`} target="_blank">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteVideo(video.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
