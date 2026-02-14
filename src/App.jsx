import React, { useState, useEffect } from 'react';
import {
  Play,
  TrendingUp,
  Film,
  Tv,
  Plus,
  Search,
  Bell,
  Bookmark,
  Star,
  LayoutGrid,
  Heart,
  Settings,
  Menu
} from 'lucide-react';
import movieData from './data.json';

const MovieCard = ({ movie }) => (
  <a href={movie.link} target="_blank" rel="noopener noreferrer" className="card reveal">
    <img src={movie.image} alt={movie.title} className="card-img" loading="lazy" />
    <div className="card-overlay">
      <h3 className="card-title">{movie.title}</h3>
      <div className="card-meta">
        <div className="card-rating">
          <Star size={14} fill="currentColor" />
          <span>{movie.rating}</span>
        </div>
        <span style={{ color: '#94a3b8' }}>{movie.year}</span>
      </div>
    </div>
  </a>
);

const Section = ({ title, movies, icon: Icon }) => (
  <div className="reveal">
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <button style={{
        background: 'none',
        border: 'none',
        color: '#eab308',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '600'
      }}>عرض الكل</button>
    </div>
    <div className="movie-grid">
      {movies.map((movie, idx) => (
        <MovieCard key={idx} movie={movie} />
      ))}
    </div>
  </div>
);

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial delay for smooth "pro" loading feel
    setTimeout(() => {
      setData(movieData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0c',
        color: '#eab308'
      }}>
        <div className="card-rating" style={{ padding: '2rem', fontSize: '1.5rem' }}>
          <Play fill="currentColor" className="animate-pulse" />
          <span>جاري التحميل...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">
            <Play fill="currentColor" size={20} />
          </div>
          <span>بوب كورن</span>
        </div>

        <nav style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <a href="#" className="nav-link active">
            <LayoutGrid size={20} />
            <span>الرئيسية</span>
          </a>
          <a href="#" className="nav-link">
            <TrendingUp size={20} />
            <span>الأكثر مشاهدة</span>
          </a>
          <a href="#" className="nav-link">
            <Film size={20} />
            <span>أفلام</span>
          </a>
          <a href="#" className="nav-link">
            <Tv size={20} />
            <span>مسلسلات</span>
          </a>
          <a href="#" className="nav-link">
            <Bookmark size={20} />
            <span>قائمتي</span>
          </a>
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <a href="#" className="nav-link">
            <Settings size={20} />
            <span>الإعدادات</span>
          </a>
        </div>
      </aside>

      <main className="main-content">
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '0.75rem 1.5rem',
            borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            width: '400px'
          }}>
            <Search size={20} color="#94a3b8" />
            <input
              type="text"
              placeholder="ابحث عن أفلامك المفضلة..."
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                outline: 'none',
                width: '100%',
                fontFamily: 'Cairo'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button className="nav-link" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
              <Bell size={20} />
            </button>
            <div style={{
              width: '45px',
              height: '45px',
              borderRadius: '12px',
              background: 'linear-gradient(45deg, #eab308, #ca8a04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'black',
              fontWeight: 'bold'
            }}>S</div>
          </div>
        </header>

        <section className="hero reveal">
          <div className="hero-content">
            <h1 className="hero-title">Kingdom of the Planet of the Apes</h1>
            <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem' }}>
              بعد سنوات من عهد قيصر، ينطلق قرد شاب في رحلة ستجعله يتشكك في كل ما تعلمه عن الماضي.
            </p>
            <button className="btn-primary">
              <Play fill="currentColor" size={20} />
              شاهد الآن
            </button>
          </div>
        </section>

        {data.map((section, idx) => (
          <Section key={idx} title={section.category} movies={section.movies} />
        ))}

        <footer style={{
          padding: '4rem 0',
          textAlign: 'center',
          color: '#475569',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          marginTop: '4rem'
        }}>
          <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} بوب كورن ستريم</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
