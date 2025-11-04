"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon, Bell, Shield, Globe, Database } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
  const handleSave = () => {
    toast.success("Configuración guardada", {
      description: "Los cambios han sido guardados exitosamente",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Configuración</h1>
        <p className="text-muted-foreground">
          Gestiona la configuración de la plataforma
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="security">Seguridad</TabsTrigger>
          <TabsTrigger value="storage">Almacenamiento</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <CardTitle>Configuración General</CardTitle>
              </div>
              <CardDescription>
                Configura los ajustes básicos de la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="siteName">Nombre del Sitio</Label>
                <Input
                  id="siteName"
                  defaultValue="VideoStream"
                  placeholder="Nombre de tu plataforma"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Descripción</Label>
                <Input
                  id="siteDescription"
                  defaultValue="Tu plataforma de streaming favorita"
                  placeholder="Descripción del sitio"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email de Contacto</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  defaultValue="admin@videostream.com"
                  placeholder="email@example.com"
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance">Modo Mantenimiento</Label>
                  <p className="text-sm text-muted-foreground">
                    Desactiva temporalmente el sitio para mantenimiento
                  </p>
                </div>
                <Switch id="maintenance" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="registration">Registro Abierto</Label>
                  <p className="text-sm text-muted-foreground">
                    Permite que nuevos usuarios se registren
                  </p>
                </div>
                <Switch id="registration" defaultChecked />
              </div>

              <Button onClick={handleSave}>Guardar Cambios</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notificaciones</CardTitle>
              </div>
              <CardDescription>
                Configura las notificaciones del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotif">Notificaciones por Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Recibe notificaciones sobre actividad importante
                  </p>
                </div>
                <Switch id="emailNotif" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="newUser">Nuevo Usuario</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificar cuando se registra un nuevo usuario
                  </p>
                </div>
                <Switch id="newUser" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="newVideo">Nuevo Video</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificar cuando se sube un nuevo video
                  </p>
                </div>
                <Switch id="newVideo" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="errors">Errores del Sistema</Label>
                  <p className="text-sm text-muted-foreground">
                    Notificar sobre errores críticos
                  </p>
                </div>
                <Switch id="errors" defaultChecked />
              </div>

              <Button onClick={handleSave}>Guardar Cambios</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Seguridad</CardTitle>
              </div>
              <CardDescription>
                Configura las opciones de seguridad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="twoFactor">Autenticación de Dos Factores</Label>
                  <p className="text-sm text-muted-foreground">
                    Requiere 2FA para acceso administrativo
                  </p>
                </div>
                <Switch id="twoFactor" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sessionTimeout">Tiempo de Sesión</Label>
                  <p className="text-sm text-muted-foreground">
                    Cerrar sesión automáticamente por inactividad
                  </p>
                </div>
                <Switch id="sessionTimeout" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxAttempts">Intentos de Inicio de Sesión</Label>
                <Input
                  id="maxAttempts"
                  type="number"
                  defaultValue="5"
                  placeholder="Número máximo de intentos"
                />
                <p className="text-xs text-muted-foreground">
                  Bloquear cuenta después de este número de intentos fallidos
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">Cambiar Contraseña</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Contraseña Actual</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nueva Contraseña</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
              </div>

              <Button onClick={handleSave}>Guardar Cambios</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Storage */}
        <TabsContent value="storage" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                <CardTitle>Almacenamiento</CardTitle>
              </div>
              <CardDescription>
                Gestiona el almacenamiento de archivos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="storageProvider">Proveedor de Almacenamiento</Label>
                <Input
                  id="storageProvider"
                  defaultValue="Local Storage"
                  placeholder="AWS S3, Cloudinary, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxFileSize">Tamaño Máximo de Archivo (MB)</Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  defaultValue="2048"
                  placeholder="Tamaño en MB"
                />
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-4">Uso de Almacenamiento</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Videos</span>
                      <span className="text-sm font-medium">45.2 GB</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "75%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Miniaturas</span>
                      <span className="text-sm font-medium">1.8 GB</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "30%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Otros</span>
                      <span className="text-sm font-medium">543 MB</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "9%" }} />
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total Usado</span>
                    <span className="font-bold text-lg">47.5 GB / 100 GB</span>
                  </div>
                </div>
              </div>

              <Button variant="outline">Limpiar Archivos Temporales</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
