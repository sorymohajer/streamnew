import axios from 'axios';
import fs from 'fs';

async function debug() {
    try {
        const response = await axios.get('https://popcorn-stream.li/ar', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'ar,en-US;q=0.9,en;q=0.8'
            }
        });
        console.log('Status:', response.status);
        console.log('Headers:', response.headers);
        fs.writeFileSync('debug.html', response.data);
        console.log('Saved to debug.html');
    } catch (error) {
        console.error('Error:', error.message);
    }
}
debug();
