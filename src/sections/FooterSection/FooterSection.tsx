import favicon from "../../assets/favicon.png";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Ambientes", href: "#ambientes" },
  { label: "Cidades", href: "#cidades" },
  { label: "Processo", href: "#processo" },
  { label: "Feedback", href: "#feedback" },
  { label: "Contato", href: "#contato" },
];

const contactInfo = [
  { label: "Av. Cecy Teixeira de Mello Almada, 359", href: undefined },
  { label: "Jardim Caicara, Registro – SP", href: undefined },
  { label: "(13) 99716-3437", href: "tel:+5513997163437" },
  { label: "WhatsApp", href: "https://wa.me/5513997163437" },
  { label: "Instagram", href: "https://instagram.com/concetto.marcenaria" },
  { label: "E-mail", href: "mailto:contato@concetto.com.br" },
];

const Footer = () => {
  return (
    <footer className="bg-[hsl(30,5%,8%)] border-t border-[hsl(30,4%,14%)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-12 lg:gap-20">
          {/* Brand */}
          <div>
            <a href="#home" className="mb-5 flex w-fit items-center gap-3">
              <img
                src={favicon}
                alt=""
                className="h-11 w-11 object-contain"
                aria-hidden="true"
              />
              <h3
                className="text-white text-xl tracking-[0.15em] uppercase font-semibold"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                CONCETTO
              </h3>
            </a>
            <p className="text-[hsl(30,8%,45%)] text-sm leading-relaxed max-w-xs">
              Móveis planejados com cuidado, elegância e execução sob medida
              para cada ambiente.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[hsl(32,55%,55%)] text-[11px] tracking-[0.25em] uppercase font-semibold mb-6">
              Navegação
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[hsl(30,8%,50%)] text-sm hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[hsl(32,55%,55%)] text-[11px] tracking-[0.25em] uppercase font-semibold mb-6">
              Contato
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-[hsl(30,8%,50%)] text-sm hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-[hsl(30,8%,50%)] text-sm">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="mt-16 pt-8 border-t border-[hsl(30,4%,14%)]">
          <p className="text-[hsl(30,6%,30%)] text-xs text-center tracking-wide">
            © {new Date().getFullYear()} Concetto Móveis Planejados. Direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
