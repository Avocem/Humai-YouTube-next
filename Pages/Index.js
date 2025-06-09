import { useEffect, useState } from "react";
import Image from "next/image";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;

export default function Home() {
  const [tracks, setTracks] = useState([]);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const resp = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=12&type=video`
        );

        if (!resp.ok) {
          throw new Error(`Błąd API: ${resp.status}`);
        }

        const data = await resp.json();

        if (!data.items) {
          console.warn("Brak wyników z YouTube API.");
          return;
        }

        const vids = data.items.map((it) => ({
          videoId: it.id.videoId,
          title: it.snippet.title,
          thumbnail: it.snippet.thumbnails.high.url,
        }));

        setTracks(vids);
      } catch (error) {
        console.error("Nie udało się pobrać danych z YouTube API:", error.message);
      }
    }

    fetchTracks();
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Hero */}
      <section className="p-8 flex flex-col md:flex-row items-center justify-center gap-8">
        <Image src="/logo.png" alt="Hu‑M‑AI logo" width={140} height={140} className="rounded-full" />
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Hu‑M‑AI</h1>
          <p className="text-lg md:text-xl mb-6">
            Muzyka na styku człowieka i algorytmu. Dialog emocji i technologii.
          </p>
          <div className="flex justify-center md:justify-start gap-4 flex-wrap">
            <a href="https://www.youtube.com/@Hu-M-ai" target="_blank" rel="noopener noreferrer">
              <button className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition">🎧 YouTube</button>
            </a>
            <a href="https://www.buymeacoffee.com/humaiai" target="_blank" rel="noopener noreferrer">
              <button className="px-6 py-3 bg-yellow-400 rounded-full hover:bg-yellow-500 transition">☕ Buy Me a Coffee</button>
            </a>
            <a href="https://ko-fi.com/hu-m-ai" target="_blank" rel="noopener noreferrer">
              <button className="px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition">❤️ Ko-fi</button>
            </a>
            <a href="https://patreon.com/hu-m-ai" target="_blank" rel="noopener noreferrer">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">🎵 Patreon</button>
            </a>
          </div>
        </div>
        <Image src="/hero-right.png" alt="Ilustracja" width={200} height={200} className="rounded-xl shadow-lg" />
      </section>

      {/* Ładowanie */}
      {tracks.length === 0 && (
        <div className="text-center my-12 animate-pulse text-lg text-gray-500">
          ⏳ Ładowanie utworów z YouTube...
        </div>
      )}

      {/* Track list */}
      <section className="p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">🎧 Najnowsze utwory</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((t) => (
            <div
              key={t.videoId}
              onMouseEnter={() => setHover(t.videoId)}
              onMouseLeave={() => setHover(null)}
              className="relative border rounded-lg overflow-hidden shadow cursor-pointer"
            >
              <a href={`https://www.youtube.com/watch?v=${t.videoId}`} target="_blank" rel="noopener noreferrer">
                <Image src={t.thumbnail} alt={t.title} width={640} height={360} className="object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-sm">{t.title}</div>
              </a>
              {hover === t.videoId && (
                <iframe
                  src={`https://www.youtube.com/embed/${t.videoId}?autoplay=1&mute=1`}
                  title={t.title}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  className="absolute inset-0 w-full h-full"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Kontakt */}
      <footer className="p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">📩 Kontakt</h2>
        <p className="mb-4">Masz pomysł? Chcesz współpracować? Napisz!</p>
        <a href="mailto:kontakt@hu-m-ai.com">
          <button className="px-8 py-3 border rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">✉️ Napisz do mnie</button>
        </a>
      </footer>
    </main>
  );
}
