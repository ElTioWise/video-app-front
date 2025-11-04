import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Tv, Smartphone, Monitor, Check } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function LandingPage() {
  const features = [
    {
      icon: Tv,
      title: "Ver en cualquier dispositivo",
      description: "Disfruta en tu TV, laptop, tablet o smartphone",
    },
    {
      icon: Play,
      title: "Streaming sin interrupciones",
      description: "Videos de alta calidad con reproducción fluida",
    },
    {
      icon: Monitor,
      title: "Contenido ilimitado",
      description: "Miles de videos en múltiples categorías",
    },
    {
      icon: Smartphone,
      title: "Descarga y ve offline",
      description: "Descarga tus videos favoritos para verlos sin conexión",
    },
  ];

  const plans = [
    {
      name: "Básico",
      price: "9.99",
      features: [
        "Streaming en HD",
        "1 dispositivo simultáneo",
        "Catálogo completo",
        "Sin anuncios",
      ],
    },
    {
      name: "Estándar",
      price: "14.99",
      features: [
        "Streaming en Full HD",
        "2 dispositivos simultáneos",
        "Catálogo completo",
        "Sin anuncios",
        "Descargas ilimitadas",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "19.99",
      features: [
        "Streaming en 4K",
        "4 dispositivos simultáneos",
        "Catálogo completo",
        "Sin anuncios",
        "Descargas ilimitadas",
        "Audio espacial",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1613834926943-9e4ac2945744?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </div>

        {/* Top Nav */}
        <div className="absolute top-0 left-0 right-0 z-20">
          <div className="container mx-auto px-4 py-6 flex items-center justify-between">
            <Link href="/" className="text-3xl font-bold text-primary">
              VideoStream
            </Link>
            <Link href="/login">
              <Button variant="secondary">Iniciar Sesión</Button>
            </Link>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl max-w-4xl mx-auto">
            Disfruta de contenido ilimitado
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 drop-shadow-lg max-w-2xl mx-auto">
            Miles de videos, series y documentales. Cancela cuando quieras.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-6 h-auto">
                <Play className="mr-2 h-5 w-5" />
                Comienza Gratis
              </Button>
            </Link>
            <Link href="/browse">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-6 h-auto"
              >
                Explorar Contenido
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-300">
            Prueba gratis por 30 días. No se requiere tarjeta de crédito.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Por qué VideoStream?
            </h2>
            <p className="text-xl text-muted-foreground">
              La mejor experiencia de streaming para ti
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Elige tu plan
            </h2>
            <p className="text-xl text-muted-foreground">
              Sin contratos. Cancela cuando quieras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden ${
                  plan.popular
                    ? "border-primary shadow-2xl shadow-primary/20 scale-105"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-semibold">
                    Más Popular
                  </div>
                )}
                <CardContent className={`p-8 ${plan.popular ? "pt-14" : ""}`}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold text-primary">
                        ${plan.price}
                      </span>
                      <span className="text-muted-foreground">/mes</span>
                    </div>
                  </div>

                  <Separator className="mb-8" />

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/register">
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                    >
                      Comenzar
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya disfrutan de VideoStream
          </p>
          <Link href="/register">
            <Button size="lg" className="text-lg px-8 py-6 h-auto">
              Prueba Gratis por 30 Días
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="text-2xl font-bold text-primary mb-4 inline-block">
                VideoStream
              </Link>
              <p className="text-sm text-muted-foreground">
                La mejor plataforma de streaming para disfrutar de contenido ilimitado.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Producto</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/browse" className="hover:text-primary transition-colors">
                    Explorar
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-primary transition-colors">
                    Categorías
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Compañía</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-primary transition-colors">
                    Acerca de
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/terms" className="hover:text-primary transition-colors">
                    Términos de uso
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary transition-colors">
                    Privacidad
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="mb-6" />
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} VideoStream. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
