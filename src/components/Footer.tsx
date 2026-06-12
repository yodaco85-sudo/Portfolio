import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t-[3px] border-border bg-bg py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-4 text-center text-xs text-muted md:px-8">
        <p>
          © 2026 {profile.fullName} —{" "}
          <a href={profile.contact.website} className="font-semibold underline hover:text-fg">
            Besmara
          </a>
        </p>
        <p>
          {profile.location} ·{" "}
          <a href={`mailto:${profile.contact.email}`} className="hover:text-fg">
            {profile.contact.email}
          </a>
        </p>
      </div>
    </footer>
  );
}
