import Link from "next/link";
import { MapPin } from "lucide-react";

import { projectStories } from "@/data/projectStories";

const provinceShapes = [
  {
    label: "Huelva",
    path: "M28 258C18 231 38 194 72 182C91 176 96 144 112 146C131 164 160 151 184 170C204 185 221 173 244 190C244 220 220 227 205 252C220 272 207 304 191 342C158 354 121 342 96 333C64 322 36 296 28 258Z",
    labelX: 130,
    labelY: 252,
  },
  {
    label: "Sevilla",
    path: "M244 190C272 164 309 163 326 137C345 120 375 128 385 154C376 190 398 211 422 236C412 262 418 292 394 314C354 305 333 334 313 362C280 336 250 327 219 342C207 304 220 272 205 252C220 227 244 220 244 190Z",
    labelX: 304,
    labelY: 252,
  },
  {
    label: "Cadiz",
    path: "M219 342C250 327 280 336 313 362C339 380 366 398 398 424C367 445 333 464 316 505C294 528 260 515 250 482C228 466 210 454 204 424C180 410 171 386 188 358C198 351 207 346 219 342Z",
    labelX: 286,
    labelY: 422,
  },
  {
    label: "Cordoba",
    path: "M385 154C365 128 383 91 420 67C439 50 445 27 473 31C497 31 503 53 524 62C558 73 580 96 604 119C584 154 572 184 586 222C552 238 513 255 476 285C452 263 436 250 422 236C398 211 376 190 385 154Z",
    labelX: 486,
    labelY: 154,
  },
  {
    label: "Jaen",
    path: "M604 119C643 111 672 118 706 110C728 97 742 110 764 98C796 95 827 91 853 96C859 127 858 154 836 174C815 194 820 220 792 238C770 257 741 248 715 252C686 230 643 235 612 270C600 250 592 235 586 222C572 184 584 154 604 119Z",
    labelX: 712,
    labelY: 170,
  },
  {
    label: "Malaga",
    path: "M313 362C333 334 354 305 394 314C423 304 448 300 476 285C507 302 542 309 572 330C568 354 574 377 594 397C542 411 491 410 445 431C424 429 411 426 398 424C366 398 339 380 313 362Z",
    labelX: 464,
    labelY: 358,
  },
  {
    label: "Granada",
    path: "M476 285C513 255 552 238 586 222C592 235 600 250 612 270C643 235 686 230 715 252C712 278 691 298 705 326C675 342 674 372 703 393C662 409 626 407 594 397C574 377 568 354 572 330C542 309 507 302 476 285Z",
    labelX: 628,
    labelY: 326,
  },
  {
    label: "Almeria",
    path: "M792 238C820 220 815 194 836 174C865 183 860 210 872 232C913 232 930 264 958 292C949 322 920 342 907 371C880 392 851 383 832 360C793 382 758 382 703 393C674 372 675 342 705 326C691 298 712 278 715 252C741 248 770 257 792 238Z",
    labelX: 820,
    labelY: 310,
  },
];

type AndaluciaProjectsMapProps = {
  className?: string;
  pointHref?: (slug: string) => string;
};

export function AndaluciaProjectsMap({
  className = "",
  pointHref = (slug) => `#${slug}`,
}: AndaluciaProjectsMapProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-white/12 bg-[linear-gradient(180deg,rgba(15,23,42,0.4)_0%,rgba(30,58,138,0.28)_100%)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-7 ${className}`.trim()}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-yellow-300">
            Mapa de Andalucía
          </p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white">
            Proyectos por provincias
          </h3>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-yellow-300">
          <MapPin size={22} aria-hidden="true" />
        </div>
      </div>

      <div className="relative mt-7 aspect-[1.72] min-h-[18rem] overflow-hidden rounded-lg bg-white">
        <svg
          viewBox="0 0 980 560"
          role="img"
          aria-label="Mapa de Andalucía dividido por provincias con proyectos señalados"
          className="absolute inset-0 h-full w-full"
        >
          {provinceShapes.map((province) => (
            <path
              key={province.label}
              d={province.path}
              fill="rgba(2,6,23,0.96)"
              stroke="rgba(255,255,255,0.95)"
              strokeLinejoin="round"
              strokeWidth="7"
            />
          ))}

          {provinceShapes.map((province) => (
            <text
              key={`${province.label}-label`}
              x={province.labelX}
              y={province.labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white text-[20px] font-black"
              opacity="0.78"
            >
              {province.label}
            </text>
          ))}
        </svg>

        {projectStories.map((project) => (
          <Link
            key={project.slug}
            href={pointHref(project.slug)}
            className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
            style={{
              left: `${project.mapPosition.x}%`,
              top: `${project.mapPosition.y}%`,
            }}
            aria-label={`Ver proyecto: ${project.title}`}
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-yellow-300 text-blue-950 shadow-[0_10px_24px_rgba(250,204,21,0.34)]">
              <span className="absolute h-full w-full rounded-full bg-yellow-300/45 opacity-70 motion-safe:animate-ping" />
              <MapPin size={18} strokeWidth={2.8} aria-hidden="true" />
            </span>
            <span className="hidden rounded-full bg-blue-950/88 px-3 py-1.5 text-xs font-extrabold text-white shadow-lg backdrop-blur sm:block">
              {project.installationType}
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-5 text-sm font-medium leading-7 text-blue-50/76">
        Los puntos marcan obras reales por zona. Cada proyecto incluye ficha
        técnica y mini noticia enlazada en el blog.
      </p>
    </div>
  );
}
