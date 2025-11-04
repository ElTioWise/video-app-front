import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const footerLinks = {
    company: [
      { label: "Acerca de", href: "/about" },
      { label: "Contacto", href: "/contact" },
      { label: "Términos de uso", href: "/terms" },
      { label: "Privacidad", href: "/privacy" },
    ],
    support: [
      { label: "Centro de ayuda", href: "/help" },
      { label: "FAQ", href: "/faq" },
      { label: "Reportar problema", href: "/report" },
    ],
    social: [
      { label: "Twitter", href: "#" },
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "YouTube", href: "#" },
    ],
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="col-span-1">
            <Link href="/" className="text-2xl font-bold text-primary mb-4 inline-block">
              VideoStream
            </Link>
            <p className="text-sm text-muted-foreground">
              Tu plataforma de streaming favorita para disfrutar de los mejores videos y contenido multimedia.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Compañía</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4">Síguenos</h3>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} VideoStream. Todos los derechos reservados.</p>
          <p>Hecho con ❤️ para la comunidad</p>
        </div>
      </div>
    </footer>
  );
}
