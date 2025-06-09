import React, { useState } from "react";
import Image from "next/image";

export async function getStaticProps() {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = "UClNmsL-rPjKY0RlT3x0Oclw"; // ID Twojego kanału Hu-M-ai

  // Pobierz playlistę uploadów, gdzie są wszystkie filmy kanału
  const uploadsPlaylistId = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => data.items[0].contentDetails.relatedPlaylists.uploads);

  // Pobierz filmy z playlisty uploadów
  const videos = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) =>
      data.items.map((item) => ({
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.high.url,
      }))
    );

  return {
    props: {
      tracks: videos,
    },
    revalidate: 172800, // odświeżaj co 2 dni
  };
}

export default function Home({ tracks }) {
  const [hoveredTrack, setHoveredTrack] = useState(null);

  return (
    <main className="px-4 max-w-7xl mx-auto">
      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8 mb-16 text-center">
        <Image
          src="/logo.png"
          alt="Hu-M-AI logo"
          width={140}
          height={140}
          className="rounded-full"
        />
        <div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Hu‑M‑AI</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Muzyka na styku człowieka i algorytmu. Harmonia emocji i
            technologii.
          </p>
          <a
            href="https://www.youtube.com/@Hu-M-ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="mt-6 px-8 py-4 text-lg rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition">
              🎧 Zobacz na YouTube
            </button>
          </a>
        </div>
        <Image
          src="/hero-right.png"
          alt="Ilustracja Hu-M-AI"
          width={200}
          height={200}
          className="rounded-xl shadow-lg"
        />
      </section>

      {/* O projekcie */}
      <section className="max-w-3xl text-center mb-20">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">O projekcie</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Jestem człowiekiem. Teksty są moje, ale nie tworzę sam. Moje utwory to
          dialog z maszyną. Czasem melancholijny, czasem wściekły – ale zawsze
          prawdziwy.
        </p>
      </section>

      {/* Miniplayer */}
      <section className="max-w-4xl w-full mb-20 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">🎧 Utwory</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tracks.map((track) => (
            <div
              key={track.videoId}
              onMouseEnter={() => setHoveredTrack(track.videoId)}
              onMouseLeave={() => setHoveredTrack(null)}
              className="relative border rounded-xl overflow-hidden shadow-md"
            >
              <Image
                src={track.thumbnail}
                alt={track.title}
                width={640}
                height={360}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-sm p-2">
                {track.title}
              </div>
              {hoveredTrack === track.videoId && (
                <div className="absolute inset-0">
                  <iframe
                    src={`https://www.youtube.com/embed/${track.videoId}?autoplay=1&mute=1`}
                    title={track.title}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Ilustracje */}
      <section className="max-w-5xl w-full mb-20 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">🖼️ Ilustracje</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "/gallery1.png",
            "/gallery2.png",
            "/gallery3.png",
            "/gallery4.png",
            "/gallery5.png",
            "/gallery6.png",
          ].map((src, i) => (
            <Image
              key={i}
              src={src}
              alt={`Ilustracja ${i + 1}`}
              width={300}
              height={300}
              className="rounded-xl object-cover shadow-sm"
            />
          ))}
        </div>
      </section>

      {/* Wsparcie */}
      <section className="max-w-3xl w-full mb-20 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">💖 Wesprzyj projekt</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Jeśli chcesz pomóc mi tworzyć więcej muzyki – możesz to zrobić!
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="https://www.buymeacoffee.com/humaiai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn">☕ Buy Me a Coffee</button>
          </a>
          <a
            href="https://patreon.com/hu-m-ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn">🎵 Patreon</button>
          </a>
          <a
            href="https://ko-fi.com/hu-m-ai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="btn">❤️ Ko-fi</button>
          </a>
        </div>
      </section>

      {/* Kontakt */}
      <section className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">📩 Kontakt</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Masz pomysł? Chcesz współpracować? Napisz!
        </p>
        <a href="mailto:kontakt@hu-m-ai.com">
          <button className="btn-secondary">✉️ Napisz do mnie</button>
        </a>
      </section>
    </main>
  );
}
