import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, FolderOpen, Users, Eye, TrendingUp, Clock } from "lucide-react";
import { mockVideos, mockCategories } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  // Estadísticas
  const stats = {
    totalVideos: mockVideos.length,
    totalCategorias: mockCategories.length,
    totalUsuarios: 1247, // Mock
    totalVistas: mockVideos.reduce((acc, v) => acc + v.views, 0),
    videosEstesMes: 3, // Mock
    nuevosUsuarios: 87, // Mock
  };

  // Videos recientes
  const recentVideos = mockVideos.slice(0, 5);

  // Categorías populares
  const popularCategories = mockCategories.slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al panel de administración de VideoStream
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Videos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVideos}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+{stats.videosEstesMes}</span> este mes
            </p>
          </CardContent>
        </Card>

        {/* Total Categorías */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorías</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCategorias}</div>
            <p className="text-xs text-muted-foreground">
              Categorías activas
            </p>
          </CardContent>
        </Card>

        {/* Total Usuarios */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsuarios.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-primary">+{stats.nuevosUsuarios}</span> este mes
            </p>
          </CardContent>
        </Card>

        {/* Total Vistas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vistas</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(stats.totalVistas / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground">
              Vistas acumuladas
            </p>
          </CardContent>
        </Card>

        {/* Promedio Vistas */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Promedio Vistas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(stats.totalVistas / stats.totalVideos / 1000)}K
            </div>
            <p className="text-xs text-muted-foreground">
              Por video
            </p>
          </CardContent>
        </Card>

        {/* Tiempo Total */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contenido Total</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(mockVideos.reduce((acc, v) => acc + v.duration, 0) / 3600)}h
            </div>
            <p className="text-xs text-muted-foreground">
              De contenido disponible
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Videos Recientes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Videos Recientes</CardTitle>
                <CardDescription>Últimos videos agregados</CardDescription>
              </div>
              <Link href="/admin/videos">
                <Button variant="outline" size="sm">Ver todos</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentVideos.map((video) => (
                <div key={video.id} className="flex items-center gap-4">
                  <div className="w-20 h-12 bg-muted rounded-md flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{video.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {video.categoryName} • {(video.views / 1000).toFixed(0)}K vistas
                    </p>
                  </div>
                  <Badge variant={video.featured ? "default" : "secondary"} className="flex-shrink-0">
                    {video.featured ? "Destacado" : "Normal"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categorías Populares */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Categorías Populares</CardTitle>
                <CardDescription>Más visitadas</CardDescription>
              </div>
              <Link href="/admin/categories">
                <Button variant="outline" size="sm">Ver todas</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularCategories.map((category) => (
                <div key={category.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FolderOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{category.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {category.videoCount} videos
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{category.videoCount}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>Gestiona tu contenido</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/videos?action=new">
              <Button className="w-full h-20 text-base" size="lg">
                <Video className="mr-2 h-5 w-5" />
                Subir Video
              </Button>
            </Link>
            <Link href="/admin/categories?action=new">
              <Button variant="outline" className="w-full h-20 text-base" size="lg">
                <FolderOpen className="mr-2 h-5 w-5" />
                Nueva Categoría
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button variant="outline" className="w-full h-20 text-base" size="lg">
                <Users className="mr-2 h-5 w-5" />
                Ver Usuarios
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
