import React, { useState, useEffect } from 'react';
import { Play, Star, TrendingUp, Film, Tv, Info } from 'lucide-react';
import movieData from './data.json';

const MovieCard = ({ movie }) => (
  <a href={movie.link} target="_blank" rel="noopener noreferrer" className="movie-card">
    <div className="badge">{movie.year || 'NEW'}</div>
    <img src={movie.image} alt={movie.title} className="movie-poster" loading="lazy" />
    <div className="movie-info">
      <h3 className="movie-title">{movie.title}</h3>
      <div className="movie-meta">
        <span className="rating">
          <Star size={14} fill="currentColor" />
          {movie.rating || 'N/A'}
        </span>
        <span>{movie.year}</span>
      </div>
    </div>
  </a>
);

const CategorySection = ({ title, movies, icon: Icon }) => (
  <section className="category-section">
    <h2 className="category-title">
      <Icon size={24} />
      {title}
    </h2>
    <div className="movie-grid">
      {movies.map((movie, idx) => (
        <MovieCard key={idx} movie={movie} />
      ))}
    </div>
  </section>
);

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // In a real build, data.json is imported at build time.
    // For local dev, we use the imported movieData.
    setData(movieData);
  }, []);

  const getIcon = (category) => {
    if (category.includes('نتفلكس')) return Play;
    if (category.includes('مشاهدة')) return TrendingUp;
    if (category.includes('تقييم')) return Star;
    if (category.includes('أفلام')) return Film;
    return Tv;
  };

  return (
    <div className="app-container">
      <header>
        <div className="logo">
          Popcorn Stream
        </div>
        <div style={{ color: '#a1a1aa', fontSize: '14px' }}>
          تحديث تلقائي للمحتوى
        </div>
      </header>

      <main>
        {data.length > 0 ? (
          data.map((section, idx) => (
            <CategorySection
              key={idx}
              title={section.category}
              movies={section.movies}
              icon={getIcon(section.category)}
            />
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '100px', color: '#666' }}>
            <p>جاري تحميل المحتوى...</p>
          </div>
        )}
      </main>

      <footer style={{ marginTop: '4rem', padding: '2rem', textAlign: 'center', color: '#444', borderTop: '1px solid #1a1a1a' }}>
        &copy; {new Date().getFullYear()} Popcorn Stream - Mirror Dashboard
      </footer>
    </div>
  );
}

export default App;
