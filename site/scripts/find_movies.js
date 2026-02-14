import fs from 'fs';

const html = fs.readFileSync('temp.html', 'utf-8');
const movieItems = [];

// Search for anything that looks like an image URL
const imgRegex = /(https?:\/\/[^"'\s]+\.(jpg|png|webp|jpeg))/gi;
let match;

while ((match = imgRegex.exec(html)) !== null) {
    const url = match[0];
    if (url.includes('logo') || url.includes('icon') || url.includes('og-image')) continue;

    // Find nearby text for title
    const start = Math.max(0, match.index - 300);
    const end = Math.min(html.length, match.index + 300);
    const segment = html.substring(start, end);

    // Search for title pattern
    const titleMatch = /"title":"([^"]+)"/.exec(segment);
    const title = titleMatch ? titleMatch[1] : 'فيلم مميز';

    movieItems.push({
        title,
        image: url,
        link: 'https://popcorn-stream.li/ar',
        rating: (Math.random() * 2 + 7.5).toFixed(1),
        year: '2024'
    });
}

const uniqueMovies = Array.from(new Map(movieItems.map(item => [item.image, item])).values());

const categories = [
    { category: 'أعمال نتفلكس', movies: uniqueMovies.slice(0, 10) },
    { category: 'الأكثر مشاهدة', movies: uniqueMovies.slice(10, 20) },
    { category: 'أفلام الأكشن', movies: uniqueMovies.slice(20, 30) }
];

fs.writeFileSync('src/data.json', JSON.stringify(categories, null, 2));
console.log(`Success! Found ${uniqueMovies.length} unique movie items.`);
