import fs from 'fs';

const data = fs.readFileSync('extracted_next.txt', 'utf-8');
const movieItems = [];

// Improved regex to find anything that looks like a title and an image in proximity
// Scanning for image URLs first
const imgRegex = /https?:\/\/[^"'\s]+\.(jpg|png|webp|jpeg)/g;
let match;
let lastIndex = 0;

while ((match = imgRegex.exec(data)) !== null) {
    const imgUrl = match[0];
    const segment = data.substring(Math.max(0, match.index - 500), Math.min(data.length, match.index + 500));

    // Look for a title nearby
    const titleMatch = /"title":"([^"]+)"/.exec(segment);
    const title = titleMatch ? titleMatch[1] : 'فيلم جديد';

    movieItems.push({
        title,
        image: imgUrl,
        link: 'https://popcorn-stream.li/ar',
        rating: (Math.random() * 2 + 7).toFixed(1),
        year: '2024'
    });
}

// Remove duplicates and limit
const uniqueMovies = Array.from(new Map(movieItems.map(item => [item.image, item])).values());

const categories = [
    { category: 'اعمال مختارة', movies: uniqueMovies.slice(0, 10) },
    { category: 'الأكثر مشاهدة', movies: uniqueMovies.slice(10, 20) },
    { category: 'أفلام جديدة', movies: uniqueMovies.slice(20, 30) }
];

fs.writeFileSync('src/data.json', JSON.stringify(categories, null, 2));
console.log(`Success! Parsed ${uniqueMovies.length} unique movies into src/data.json`);
