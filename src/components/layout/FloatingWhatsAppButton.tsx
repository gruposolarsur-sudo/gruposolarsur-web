import Image from "next/image";

export function FloatingWhatsAppButton() {
  return (
    <a
      href="https://wa.me/34640292375"
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir conversación por WhatsApp con Grupo SolarSur"
      className="whatsapp-float-heartbeat fixed bottom-5 right-4 z-[75] inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-[linear-gradient(180deg,#172554_0%,#1d4ed8_100%)] shadow-[0_22px_44px_rgba(23,37,84,0.28)] transition hover:scale-[1.03] hover:bg-[linear-gradient(180deg,#1e3a8a_0%,#2563eb_100%)] sm:bottom-6 sm:right-6"
    >
      <Image
        src="/assets/logos/logo-whatsapp.webp"
        alt=""
        width={34}
        height={34}
        className="h-[2.15rem] w-[2.15rem] object-contain"
        priority
      />
      <span className="sr-only">WhatsApp 640 29 23 75</span>
    </a>
  );
}
