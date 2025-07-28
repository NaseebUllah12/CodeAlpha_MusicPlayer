const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const current = document.getElementById("current");
const duration = document.getElementById("duration");

let isPlaying = false;
let songIndex = 0;

const songs = [
  {
    name: "song1",
    title: "Dreamy Vibes",
    artist: "Lo-Fi Artist"
  },
  {
    name: "song2",
    title: "Morning Energy",
    artist: "Electro Pop"
  },
  {
    name: "song3",
    title: "Chill Night",
    artist: "Ambient Flow"
  }
];

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = `songs/${song.name}.mp3`;
}

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = "▶";
  } else {
    audio.play();
    playPauseBtn.textContent = "⏸";
  }
  isPlaying = !isPlaying;
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
  playPauseBtn.textContent = "⏸";
  isPlaying = true;
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  audio.play();
  playPauseBtn.textContent = "⏸";
  isPlaying = true;
}

function updateProgress(e) {
  if (audio.duration) {
    const { duration: dur, currentTime } = e.srcElement;
    const percent = (currentTime / dur) * 100;
    progress.style.width = `${percent}%`;

    current.textContent = formatTime(currentTime);
    duration.textContent = formatTime(dur);
  }
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function setVolume(value) {
  audio.volume = value;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);

// Load first song
loadSong(songs[songIndex]);
