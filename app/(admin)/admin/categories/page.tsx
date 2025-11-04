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
import { Plus, Search, Pencil, Trash2, FolderOpen } from "lucide-react";
import { mockCategories, getVideosByCategory } from "@/lib/mock-data";
import { toast } from "sonner";

export default function CategoriesManagement() {
  const [categories, setCategories] = useState(mockCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Filter categories
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateCategory = () => {
    // TODO: Implementar lógica de creación con backend
    const newCategory = {
      id: String(categories.length + 1),
      name: formData.name,
      description: formData.description,
      videoCount: 0,
    };
    setCategories([...categories, newCategory]);
    toast.success("Categoría creada exitosamente", {
      description: `La categoría "${formData.name}" ha sido agregada`,
    });
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleEditCategory = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category) {
      setFormData({
        name: category.name,
        description: category.description || "",
      });
      setEditingCategory(categoryId);
      setIsCreateDialogOpen(true);
    }
  };

  const handleUpdateCategory = () => {
    // TODO: Implementar lógica de actualización
    setCategories(
      categories.map((c) =>
        c.id === editingCategory
          ? { ...c, name: formData.name, description: formData.description }
          : c
      )
    );
    toast.success("Categoría actualizada", {
      description: "Los cambios han sido guardados",
    });
    setIsCreateDialogOpen(false);
    resetForm();
  };

  const handleDeleteCategory = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category && category.videoCount > 0) {
      toast.error("No se puede eliminar", {
        description: "Esta categoría tiene videos asociados",
      });
      return;
    }

    setCategories(categories.filter((c) => c.id !== categoryId));
    toast.success("Categoría eliminada", {
      description: "La categoría ha sido eliminada",
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
    });
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestión de Categorías</h1>
          <p className="text-muted-foreground">
            Administra las categorías del catálogo
          </p>
        </div>
        <Dialog
          open={isCreateDialogOpen}
          onOpenChange={(open) => {
            setIsCreateDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              Nueva Categoría
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingCategory ? "Editar Categoría" : "Nueva Categoría"}
              </DialogTitle>
              <DialogDescription>
                {editingCategory
                  ? "Actualiza la información de la categoría"
                  : "Crea una nueva categoría para organizar los videos"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Nombre de la Categoría</Label>
                <Input
                  id="name"
                  placeholder="Ej: Acción"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Descripción (opcional)</Label>
                <Textarea
                  id="description"
                  placeholder="Describe el tipo de contenido de esta categoría..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateDialogOpen(false);
                  resetForm();
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={editingCategory ? handleUpdateCategory : handleCreateCategory}
              >
                {editingCategory ? "Actualizar" : "Crear"} Categoría
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Categorías</CardDescription>
            <CardTitle className="text-3xl">{categories.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Categorías Activas</CardDescription>
            <CardTitle className="text-3xl">
              {categories.filter((c) => c.videoCount > 0).length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Promedio Videos</CardDescription>
            <CardTitle className="text-3xl">
              {Math.round(
                categories.reduce((acc, c) => acc + c.videoCount, 0) / categories.length
              )}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Categorías</CardTitle>
              <CardDescription>Gestiona todas las categorías</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar categorías..."
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
                <TableHead>Categoría</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Videos</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <FolderOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ID: {category.id}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground max-w-md truncate">
                      {category.description || "Sin descripción"}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{category.videoCount} videos</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={category.videoCount > 0 ? "default" : "secondary"}>
                      {category.videoCount > 0 ? "Activa" : "Vacía"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditCategory(category.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteCategory(category.id)}
                        disabled={category.videoCount > 0}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No se encontraron categorías</h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? "Intenta con otro término de búsqueda"
                  : "Comienza creando una nueva categoría"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
