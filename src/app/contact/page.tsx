import { profile } from "@/data/portfolio";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Yoann Dos Santos Da Costa",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-8 py-32">
      <div className="w-full max-w-2xl">
        <a
          href="/"
          className="font-mono text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity mb-16 block"
        >
          ← Retour
        </a>

        <h1 className="font-[family-name:var(--font-syne)] text-7xl uppercase tracking-tighter text-accent mb-4">
          CONTACT
        </h1>
        <p className="font-mono text-sm opacity-60 mb-16">
          Un projet, une alternance, une question — écrivez.
        </p>

        <form
          action={`mailto:${profile.contact.email}`}
          method="GET"
          encType="text/plain"
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-40">
              Nom
            </label>
            <input
              type="text"
              name="name"
              required
              className="brutal-border border-white bg-transparent font-mono text-sm px-4 py-3 outline-none focus:border-accent transition-colors"
              placeholder="Votre nom"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-40">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="brutal-border border-white bg-transparent font-mono text-sm px-4 py-3 outline-none focus:border-accent transition-colors"
              placeholder="votre@email.fr"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-40">
              Message
            </label>
            <textarea
              name="body"
              required
              rows={6}
              className="brutal-border border-white bg-transparent font-mono text-sm px-4 py-3 outline-none focus:border-accent transition-colors resize-none"
              placeholder="Décrivez votre projet ou votre demande..."
            />
          </div>

          <button
            type="submit"
            className="brutal-border brutal-shadow-sm bg-accent font-mono text-xs font-bold uppercase tracking-widest px-8 py-4 text-left transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_white] mt-4"
          >
            Envoyer →
          </button>
        </form>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col gap-2 font-mono text-xs opacity-40">
          <span>{profile.contact.email}</span>
          <span>{profile.contact.phone}</span>
        </div>
      </div>
    </main>
  );
}
