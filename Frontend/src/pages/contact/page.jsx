export const metadata = {
    title: "Contact | Kalyan",
    description: "Reach out for collaborations, questions, or project ideas.",
};
export default function ContactPage() {
    return (<main className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">Contact</h1>
        <p className="mt-3 text-gray-600 max-w-2xl">
          Have a project in mind or a question about AI & Astrology? Send a message and
          I’ll get back within 24–48 hours.
        </p>

        <form action="https://formspree.io/f/mayvllyp" method="POST" className="mt-8 grid grid-cols-1 gap-4">
          <input type="text" name="name" placeholder="Your name" required className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"/>
          <input type="email" name="email" placeholder="Your email" required className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"/>
          <textarea name="message" placeholder="Tell me a bit about your idea..." rows={6} required className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"/>
          <button type="submit" className="inline-flex items-center justify-center rounded-xl bg-gray-900 text-white px-6 py-3 font-semibold hover:bg-black">
            Send message
          </button>
        </form>
      </div>
    </main>);
}
