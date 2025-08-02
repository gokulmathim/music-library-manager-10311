export default function Home() {
  return (
    <section className="flex flex-col justify-center items-center py-32 text-center">
      <h1 className="text-5xl font-extrabold mb-6 text-primary">
        Welcome to MyMusic Library
      </h1>
      <p className="mb-8 text-lg max-w-2xl">
        Discover, upload, and organize your personal and shared music library.
        Search tracks, manage playlists, and stream music with a modern, responsive interface.
        <br />
        Please <a href="/login" className="text-accent underline hover:text-primary">login</a> or <a href="/register" className="text-primary underline hover:text-accent">register</a> to begin!
      </p>
      <div className="flex gap-3">
        <a href="/login" className="px-6 py-3 rounded bg-primary text-white font-semibold shadow hover:bg-accent">
          Login
        </a>
        <a href="/register" className="px-6 py-3 rounded bg-secondary text-white font-semibold shadow hover:bg-accent">
          Register
        </a>
      </div>
    </section>
  );
}
