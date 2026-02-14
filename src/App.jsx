import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Info,
  Star,
  Search,
  ChevronRight,
  ChevronLeft,
  Volume2,
  Plus
} from 'lucide-react';
// movieData will be fetched at runtime

const MovieCard = ({ movie }) => (
  <a href={movie.link} target="_blank" rel="noopener noreferrer" className="movie-card-v2">
    <img src={movie.image} alt={movie.title} className="card-img" />
    <div className="card-info">
      <h3 className="card-name">{movie.title}</h3>
      <div className="card-bottom">
        <div className="rating-tag">
          <Star size={14} fill="currentColor" />
          <span>{movie.rating}</span>
        </div>
        <span style={{ color: '#888' }}>{movie.year}</span>
      </div>
    </div>
  </a>
);

const MovieRow = ({ title, movies }) => {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = dir === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="reveal active">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="row-title">{title}</h2>
      </div>
      <div style={{ position: 'relative', group: 'true' }}>
        <div className="horizontal-scroll" ref={rowRef}>
          {movies.map((movie, idx) => (
            <MovieCard key={idx} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

function App() {
  // Initialize with fallback data to ensure content ALWAYS shows
  const [data, setData] = useState([
    {
      category: "أعمال مختارة لكم",
      movies: [
        { title: "Dune: Part Two", image: "https://image.tmdb.org/t/p/w500/8b697tS6lYvS9696G1nU0O1sMmo.jpg", rating: "9.0", year: "2024", link: "https://popcorn-stream.li/ar" },
        { title: "Oppenheimer", image: "https://image.tmdb.org/t/p/w500/8Gxv3m7YbtpD3u79A7G7R7XlC.jpg", rating: "9.0", year: "2023", link: "https://popcorn-stream.li/ar" },
        { title: "The Batman", image: "https://image.tmdb.org/t/p/w500/7469sxS6lYvS9696G1nU0O1sMmo.jpg", rating: "8.4", year: "2022", link: "https://popcorn-stream.li/ar" },
        { title: "John Wick 4", image: "https://image.tmdb.org/t/p/w500/8659sxS6lYvS9696G1nU0O1sMmo.jpg", rating: "8.8", year: "2023", link: "https://popcorn-stream.li/ar" },
        { title: "Spider-Man: Across the Spider-Verse", image: "https://image.tmdb.org/t/p/w500/8vt6G97tS6lYvS9696G1nU0O1sMmo.jpg", rating: "9.2", year: "2023", link: "https://popcorn-stream.li/ar" }
      ]
    }
  ]);
  const [scrolled, setScrolled] = useState(false);
  const [loading, setLoading] = useState(false); // No loading screen, show content immediately

  useEffect(() => {
    const loadData = async () => {
      try {
        // Correct path construction using Vite's BASE_URL
        const basePath = import.meta.env.BASE_URL;
        const jsonPath = `${basePath}data.json`.replace('//', '/'); // Avoid double slashes
        console.log("Fetching from:", jsonPath);

        const response = await fetch(jsonPath);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const movieData = await response.json();

        console.log("Fetched Movie Data:", movieData);
        if (movieData && Array.isArray(movieData) && movieData.length > 0) {
          setData(movieData);
        }
      } catch (err) {
        console.error("Fetch failed, keeping fallback data:", err);
      }
    };

    loadData();

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return null;

  return (
    <div className="app-container">
      <header className={`premium-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo-wrap">
          <div className="logo-badge">PRO</div>
          <span>بوب كورن</span>
        </div>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <nav style={{ display: 'flex', gap: '1.5rem', fontWeight: '600', fontSize: '0.95rem' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>الرئيسية</a>
            <a href="#" style={{ color: '#aaa', textDecoration: 'none' }}>مسلسلات</a>
            <a href="#" style={{ color: '#aaa', textDecoration: 'none' }}>أفلام</a>
            <a href="#" style={{ color: '#aaa', textDecoration: 'none' }}>قائمتي</a>
          </nav>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Search size={20} />
          <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: 'var(--grad)' }}></div>
        </div>
      </header>

      <section className="hero-v2" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original/mXLOHHc1ZcmwCYwz0vShtTZaSsh.jpg')` }}>
        <div className="hero-content">
          <div className="hero-label">
            <span style={{ color: '#ffc107' }}>●</span> حصرياً على بوب كورن
          </div>
          <h1 className="hero-title">Kingdom of the Planet<br />of the Apes</h1>
          <p style={{ fontSize: '1.2rem', color: '#ccc', marginBottom: '2rem' }}>
            بعد أجيال عديدة من عهد قيصر، تنقسم مجتمعات القرود وتدخل في صراعات جديدة بينما يحاول قرد شاب تغيير مسار التاريخ.
          </p>
          <div className="hero-btns">
            <button className="btn-glass btn-fill">
              <Play fill="black" size={24} />
              تشغيل الآن
            </button>
            <button className="btn-glass btn-outline">
              <Plus size={24} />
              قائمتي
            </button>
          </div>
        </div>
      </section>

      <div className="movie-rows">
        {data.map((row, idx) => (
          <MovieRow key={idx} title={row.category} movies={row.movies} />
        ))}
      </div>

      <footer style={{ padding: '5rem 4%', textAlign: 'center', color: '#555', marginTop: '5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
          <a href="#" style={{ color: '#555' }}>عن الموقع</a>
          <a href="#" style={{ color: '#555' }}>سياسة الخصوصية</a>
          <a href="#" style={{ color: '#555' }}>اتصل بنا</a>
        </div>
        <p>&copy; {new Date().getFullYear()} Popcorn Stream Premium. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
