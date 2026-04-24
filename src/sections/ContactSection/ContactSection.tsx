import {
  Mail,
  MessageCircle,
  Instagram,
  MapPin,
  Clock,
  ArrowUpRight,
} from "lucide-react";

const mapsQuery =
  "Concetto Moveis Planejados, Av. Profa. Cecy Teixeira de Mello Almada, 359, Jardim Caicara, Registro - SP";
const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&z=15&output=embed`;
const mapsExternalUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;

const contactLinks = [
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: "WhatsApp",
    detail: "(13) 99716-3437",
    description: "Resposta rápida em horário comercial",
    href: "https://wa.me/5513997163437?text=Ol%C3%A1%2C%20tudo%20bem%3F%20Estou%20entrando%20em%20contato%20pelo%20site%20da%20Concetto%20e%20gostaria%20de%20fazer%20um%20or%C3%A7amento.",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: "E-mail",
    detail: "concettomplanejados@gmail.com",
    description: "Para orcamentos e projetos detalhados",
    href: "mailto:concettomplanejados@gmail.com",
  },
  {
    icon: <Instagram className="w-5 h-5" />,
    label: "Instagram",
    detail: "@concetto.planejados",
    description: "Nosso portfolio e bastidores",
    href: "https://www.instagram.com/concetto.planejados/",
  },
];

const ContactSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-[hsl(30,5%,10%)]"
      id="contato"
    >
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent, transparent 2px, hsl(30,10%,20%) 2px, hsl(30,10%,20%) 3px)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <span className="mb-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-[hsl(32,55%,55%)]">
              <span className="h-px w-8 bg-[hsl(32,55%,55%)]" />
              Contato
            </span>
            <h2
              className="mb-6 text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-tight text-white"
              style={{ lineHeight: "1.08" }}
            >
              Vamos conversar
              <br />
              sobre seu projeto
            </h2>
            <p className="mb-12 max-w-sm text-base leading-relaxed text-[hsl(30,8%,50%)]">
              Entre em contato pelo canal que preferir. Estamos prontos para
              transformar seus ambientes com moveis sob medida.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3 text-[hsl(30,8%,50%)]">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(32,55%,55%)]" />
                <span>
                  Av. Cecy Teixeira de Mello Almada, 359
                  <br />
                  Jardim Caicara, Registro - SP
                </span>
              </div>
              <div className="flex items-start gap-3 text-[hsl(30,8%,50%)]">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(32,55%,55%)]" />
                <span>
                  Seg a Sex: 08:00-17:30
                  <br />
                  Sab: 08:00-12:00
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            {contactLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-5 rounded-xl border border-[hsl(30,4%,18%)] bg-[hsl(30,4%,13%)] px-7 py-6 transition-all duration-200 hover:border-[hsl(32,40%,35%)] hover:bg-[hsl(30,4%,15%)] active:scale-[0.98]"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[hsl(32,55%,55%,0.1)] text-[hsl(32,55%,55%)] transition-colors duration-200 group-hover:bg-[hsl(32,55%,55%,0.15)]">
                  {item.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex items-center gap-2">
                    <span className="font-medium text-white">{item.label}</span>
                    <span className="text-xs text-[hsl(30,6%,30%)]">-</span>
                    <span className="text-sm text-[hsl(32,55%,55%)]">
                      {item.detail}
                    </span>
                  </div>
                  <p className="text-sm text-[hsl(30,6%,40%)]">
                    {item.description}
                  </p>
                </div>
                <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-[hsl(30,6%,30%)] transition-colors duration-200 group-hover:text-[hsl(32,55%,55%)]" />
              </a>
            ))}
          </div>
        </div>

        <div className="relative mt-16 h-72 overflow-hidden rounded-2xl border border-[hsl(30,4%,18%)]">
          <iframe
            src={mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{
              border: 0,
              filter:
                "invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.8)",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localizacao Concetto Marcenaria"
          />
          <a
            href={mapsExternalUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir localizacao da Concetto no Google Maps"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[hsl(32,55%,55%,0.38)] bg-[hsl(30,5%,10%,0.78)] text-[hsl(32,55%,55%)] backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:border-[hsl(32,55%,55%,0.58)] hover:bg-[hsl(30,5%,12%,0.92)]"
          >
            <MapPin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
