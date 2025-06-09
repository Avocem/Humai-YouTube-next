import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Hu-M-ai – Muzyka z YouTube</title>
        <meta name="description" content="Lista utworów z kanału Hu-M-ai" />
      </Head>
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Witaj na stronie Hu-M-ai 🎵</h1>
        <p>Lista moich utworów będzie tu wkrótce widoczna.</p>
      </main>
    </>
  );
}
