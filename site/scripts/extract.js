import fs from 'fs';

const html = fs.readFileSync('temp.html', 'utf-8');
const regex = /self\.__next_f\.push\(\[1,"(.*?)"\]\)/g;
let match;
let fullData = '';

while ((match = regex.exec(html)) !== null) {
    let piece = match[1];
    // Decolumnize/Unescape if needed
    piece = piece.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    fullData += piece;
}

fs.writeFileSync('extracted_next.txt', fullData);
console.log('Extracted data to extracted_next.txt');

// Try to find movie patterns
const movieRegex = /"title":"(.*?)"/g;
const titles = [];
let m;
while ((m = movieRegex.exec(fullData)) !== null) {
    titles.push(m[1]);
}
console.log('Found titles:', titles.slice(0, 10));
