const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
let slider = document.getElementById('myRange');
const output = document.getElementById('volume-val');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//  Music
const songs = [
    {
        name:'September',
        displayName:'September',
        artist:'James Arthur',
    },
    {
        name:'Sorry',
        displayName:'Sorry',
        artist:'Halsey',
    },
    {
        name:"Say you won't let go",
        displayName:"Say you won't let go",
        artist:'James Arthur',
    },
    {
        name:'Hotel room',
        displayName:'Hotel room',
        artist:'Calum Scott',
    },
    {
        name:'Never Seen Anything Quite Like You',
        displayName:'Quiet Like You',
        artist:'The Script',
    },
    {
        name:'Lost Boy',
        displayName:'Lost Boy',
        artist:'Ruth B.',
    },
]; 

// Check if Playing
let isPlaying = false;

// Play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or pause eventlistner
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Get Current Song
let currSong = 0;

// Prev Song
function prevSong() {
    currSong--;
    if(currSong < 0){
        currSong = songs.length-1;
    }
    loadSong(songs[currSong]);
    playSong();
}

function nextSong() {
    currSong++;
    if(currSong > songs.length-1){
        currSong = 0;
    }
    loadSong(songs[currSong]);
    playSong();
}

// Upadte Progress Bar Function
function updateProgressBar(e) { // e is an event
    if(isPlaying) {
        const {duration, currentTime} = e.target // object desturcturing
        // Update progress bar
        const progressPercent = (currentTime/duration)*100;
        progress.style.width = `${progressPercent}%`;// accessing styles.css
        // To calculate display of duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration%60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay switching duration Element to avoid NAN
        if(durationSeconds){
            durationEl.textContent=`${durationMinutes}:${durationSeconds}`;
        }
        // To calculate display of current Time
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime%60);
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width)*duration;
}

function setVolume() {
    let y = slider.value;
    music.volume = y/100;
}

// Event Listners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
slider.addEventListener('mousemove', function(){
    let x = slider.value;
    let color = `linear-gradient(90deg, rgb(20, 20, 20)${x}%, rgb(255,255,255) ${x}%)`;
    slider.style.background = color;
});
slider.addEventListener('mousemove', setVolume);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);