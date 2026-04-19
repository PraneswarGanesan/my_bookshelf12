import { projects } from "../data/Projects";

export default function ProjectList() {
  return (
    <div className="space-y-16">
      {projects.map((p, i) => (
        <div key={i} className="grid md:grid-cols-2 gap-8 items-start">
          
          {/* TEXT */}
          <div>
            <h3 className="text-lg font-medium">{p.title}</h3>
            <p className="text-[var(--muted)] mt-2">{p.description}</p>
            <p className="text-sm mt-3">{p.stack}</p>

            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 underline underline-offset-4"
              >
                View project
              </a>
            )}
          </div>

          {/* IMAGE */}
          <div className="w-full">
            <img
              src={p.image}
              alt={p.title}
              className="w-full rounded-lg grayscale hover:grayscale-0 transition"
            />
          </div>

        </div>
      ))}
    </div>
  );
}
