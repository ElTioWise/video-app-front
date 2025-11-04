"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, UserCog, Ban, Mail, MoreVertical, Crown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Mock users data
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: "free" | "basic" | "standard" | "premium";
  status: "active" | "inactive" | "suspended";
  joinedDate: string;
  videosWatched: number;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    plan: "premium",
    status: "active",
    joinedDate: "2024-01-15",
    videosWatched: 142,
  },
  {
    id: "2",
    name: "María García",
    email: "maria.garcia@example.com",
    plan: "standard",
    status: "active",
    joinedDate: "2024-02-01",
    videosWatched: 87,
  },
  {
    id: "3",
    name: "Carlos López",
    email: "carlos.lopez@example.com",
    plan: "basic",
    status: "active",
    joinedDate: "2024-02-10",
    videosWatched: 45,
  },
  {
    id: "4",
    name: "Ana Martínez",
    email: "ana.martinez@example.com",
    plan: "free",
    status: "inactive",
    joinedDate: "2024-03-01",
    videosWatched: 12,
  },
  {
    id: "5",
    name: "Luis Rodríguez",
    email: "luis.rodriguez@example.com",
    plan: "premium",
    status: "suspended",
    joinedDate: "2024-01-20",
    videosWatched: 203,
  },
  {
    id: "6",
    name: "Sofia Hernández",
    email: "sofia.hernandez@example.com",
    plan: "standard",
    status: "active",
    joinedDate: "2024-02-15",
    videosWatched: 76,
  },
];

export default function UsersManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesPlan = planFilter === "all" || user.plan === planFilter;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const handleSuspendUser = (userId: string) => {
    setUsers(
      users.map((u) =>
        u.id === userId ? { ...u, status: "suspended" as const } : u
      )
    );
    toast.success("Usuario suspendido", {
      description: "El usuario ha sido suspendido exitosamente",
    });
  };

  const handleActivateUser = (userId: string) => {
    setUsers(
      users.map((u) => (u.id === userId ? { ...u, status: "active" as const } : u))
    );
    toast.success("Usuario activado", {
      description: "El usuario ha sido activado exitosamente",
    });
  };

  const handleSendEmail = (userEmail: string) => {
    toast.success("Email enviado", {
      description: `Se ha enviado un email a ${userEmail}`,
    });
  };

  const getPlanBadgeVariant = (plan: string) => {
    switch (plan) {
      case "premium":
        return "default";
      case "standard":
        return "secondary";
      case "basic":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "inactive":
        return "secondary";
      case "suspended":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPlanIcon = (plan: string) => {
    if (plan === "premium") {
      return <Crown className="h-3 w-3" />;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Gestión de Usuarios</h1>
        <p className="text-muted-foreground">
          Administra los usuarios y suscripciones
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Usuarios</CardDescription>
            <CardTitle className="text-3xl">{users.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Activos</CardDescription>
            <CardTitle className="text-3xl">
              {users.filter((u) => u.status === "active").length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Premium</CardDescription>
            <CardTitle className="text-3xl">
              {users.filter((u) => u.plan === "premium").length}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Nuevos (este mes)</CardDescription>
            <CardTitle className="text-3xl">87</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters and Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <CardTitle>Lista de Usuarios</CardTitle>
              <CardDescription>
                Gestiona todos los usuarios de la plataforma
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar usuarios..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="inactive">Inactivos</SelectItem>
                  <SelectItem value="suspended">Suspendidos</SelectItem>
                </SelectContent>
              </Select>
              <Select value={planFilter} onValueChange={setPlanFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="basic">Básico</SelectItem>
                  <SelectItem value="free">Gratis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuario</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Videos Vistos</TableHead>
                <TableHead>Fecha de Registro</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getPlanBadgeVariant(user.plan)}
                      className="capitalize gap-1"
                    >
                      {getPlanIcon(user.plan)}
                      {user.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(user.status)} className="capitalize">
                      {user.status === "active"
                        ? "Activo"
                        : user.status === "inactive"
                        ? "Inactivo"
                        : "Suspendido"}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.videosWatched}</TableCell>
                  <TableCell>
                    {new Date(user.joinedDate).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleSendEmail(user.email)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Enviar Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserCog className="mr-2 h-4 w-4" />
                          Ver Detalles
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === "active" ? (
                          <DropdownMenuItem
                            onClick={() => handleSuspendUser(user.id)}
                            className="text-destructive"
                          >
                            <Ban className="mr-2 h-4 w-4" />
                            Suspender
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleActivateUser(user.id)}>
                            <UserCog className="mr-2 h-4 w-4" />
                            Activar
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No se encontraron usuarios</h3>
              <p className="text-muted-foreground">
                Intenta con otros filtros o términos de búsqueda
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
