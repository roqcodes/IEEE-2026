import Link from "next/link";

const paths = [
  { verb: "Join", text: "Become an IEEE member and access global resources.", href: "/join" },
  { verb: "Build", text: "Contribute to student projects and technical chapters.", href: "/societies" },
  { verb: "Volunteer", text: "Help organise events, media, and branch operations.", href: "/execom" },
  { verb: "Lead", text: "Stand for executive committee and shape the branch.", href: "/contact" },
];

export default function JoinSection() {
  return (
    <section className="py-24 lg:py-36 bg-ink text-white" aria-labelledby="join-heading">
      <div className="container-editorial">
        <div className="grid-12">
          <div className="col-span-4 md:col-span-6 mb-16 md:mb-0">
            <p className="eyebrow text-white/40 mb-6">Your Journey</p>
            <h2 id="join-heading" className="display-lg text-white mb-8">
              Your IEEE
              <br />
              Journey Starts
              <br />
              Here.
            </h2>
            <Link href="/join" className="btn-primary bg-white text-ink hover:bg-white/90">
              Join IEEE CUSAT →
            </Link>
          </div>

          <div className="col-span-4 md:col-span-5 md:col-start-8 divide-y divide-white/10">
            {paths.map((path) => (
              <Link
                key={path.verb}
                href={path.href}
                className="block py-8 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white group-hover:text-white/60 transition-colors">
                  {path.verb}
                </span>
                <p className="mt-2 text-sm text-white/50 max-w-sm">{path.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
