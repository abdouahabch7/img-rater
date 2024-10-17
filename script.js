let imageRatings = new Map();
let uploadedImageUrl = '';

function hashCode(str) {
let hash = 0;
for (let i = 0; i < str.length; i++) {
const char = str.charCodeAt(i);
hash = ((hash << 5) - hash) + char;
hash = hash & hash;
}
return Math.abs(hash);
}

function generateRating(url) {
if (imageRatings.has(url)) {
return imageRatings.get(url);
} else {
const rating = (hashCode(url) % 10) + 1;
imageRatings.set(url, rating);
return rating;
}
}

function displayImage(input) {
const file = input.files[0];
const reader = new FileReader();

reader.onload = function (e) {
const imageElement = document.getElementById('image');
imageElement.src = e.target.result;
uploadedImageUrl = e.target.result;
};

reader.readAsDataURL(file);
}

function loadYouTubeImage() {
const urlInput = document.getElementById('urlInput');
const youtubeUrl = urlInput.value;

const videoIdRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
const match = youtubeUrl.match(videoIdRegex);

if (match && match[1]) {
const videoId = match[1];
const imageUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

const imageElement = document.getElementById('image');
imageElement.src = imageUrl;
uploadedImageUrl = imageUrl;
} else {
alert('Invalid YouTube URL');
}
}

function rateImage() {
const ratingResult = document.getElementById('ratingResult');
const imageUrl = uploadedImageUrl;

if (imageUrl) {
const rating = generateRating(imageUrl);
ratingResult.value = `Rating: ${rating}`;
} else {
ratingResult.value = 'No image loaded.';
}
}

function clearInputs() {
document.getElementById('image').src = '';
document.getElementById('urlInput').value = '';
document.getElementById('ratingResult').value = '';
uploadedImageUrl = '';
}