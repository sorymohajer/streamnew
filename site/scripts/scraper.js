import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://popcorn-stream.li/ar';
const CATEGORIES = [
    { name: ' اعمال نتفلكس', url: 'https://popcorn-stream.li/search/category/netflix' },
    { name: 'الأكثر مشاهدة هذا الأسبوع', url: 'https://popcorn-stream.li/search/category/trending' },
    { name: 'الأعلى تقييمًا', url: 'https://popcorn-stream.li/search/category/top_rated' },
    { name: 'أفلام الأكشن', url: 'https://popcorn-stream.li/search/category/action' },
    { name: 'كوميدي', url: 'https://popcorn-stream.li/search/category/comedy' }
];

async function scrapeCategory(category) {
    try {
        console.log(`Scraping category: ${category.name}...`);
        const { data } = await axios.get(category.url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const $ = cheerio.load(data);
        const movies = [];

        // Selecting based on common movie site patterns
        // Selecting items inside .grid or similar containers
        $('.post-card, .movie-item, .item, .entry').each((i, el) => {
            const title = $(el).find('h2, h3, .title, .item-title').text().trim();
            const link = $(el).find('a').attr('href');
            let image = $(el).find('img').attr('src') || $(el).find('img').attr('data-src') || $(el).find('img').attr('data-lazy-src');
            const rating = $(el).find('.rating, .rate, .imdb').text().trim();
            const year = $(el).find('.year, .release-year').text().trim();

            if (title && link) {
                // Ensure image is clean
                if (image && image.includes(' ')) image = image.split(' ')[0];

                movies.push({
                    title,
                    link: link.startsWith('http') ? link : `https://popcorn-stream.li${link}`,
                    image: image ? (image.startsWith('http') ? image : `https://popcorn-stream.li${image}`) : 'https://placehold.co/400x600/161618/d4af37?text=Popcorn',
                    rating: rating || '8.5', // Fallback for better UI feel
                    year: year || '2024'
                });
            }
        });

        console.log(`Found ${movies.length} items in ${category.name}`);
        return {
            category: category.name,
            movies: movies.slice(0, 20)
        };
    } catch (error) {
        console.error(`Error scraping ${category.name}:`, error.message);
        return { category: category.name, movies: [] };
    }
}

async function run() {
    const results = [];
    for (const cat of CATEGORIES) {
        const data = await scrapeCategory(cat);
        results.push(data);
    }

    const srcDir = path.join(__dirname, '../src');
    if (!fs.existsSync(srcDir)) {
        fs.mkdirSync(srcDir, { recursive: true });
    }

    const dataPath = path.join(srcDir, 'data.json');
    fs.writeFileSync(dataPath, JSON.stringify(results, null, 2));
    console.log(`Success! Data saved to ${dataPath}`);
}

run();
