
const fileInput = document.getElementById("fileInput");
const addMusicBtn = document.getElementById("addMusicBtn");
const playlist = document.getElementById("playlist");
const songTemplate = document.getElementById("songTemplate");
const audioPlayer = document.getElementById("audioPlayer");
const audioSource = document.getElementById("audioSource");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let musicFiles = [];
let currentTrackIndex = 0;


function updatePlaylist() {
  playlist.innerHTML = ""; 
  musicFiles.forEach((file, index) => {
    
    const songElement = songTemplate.cloneNode(true);
    songElement.style.display = "flex";
    songElement.querySelector(".song-name").textContent = file.name;
    songElement.querySelector(".delete-btn").onclick = () => deleteSong(index);
    songElement.onclick = () => playTrack(index);
    playlist.appendChild(songElement);
  });
}


function addMusic() {
  const file = fileInput.files[0];
  if (file) {
    const fileURL = URL.createObjectURL(file);
    musicFiles.push({ name: file.name, url: fileURL });
    saveToLocalStorage();
    updatePlaylist();
  }
}


function playTrack(index) {
  currentTrackIndex = index;
  const track = musicFiles[index];
  audioSource.src = track.url;
  audioPlayer.load();
  audioPlayer.play();
  playPauseBtn.textContent = "Pause";
}


playPauseBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.textContent = "Pause";
  } else {
    audioPlayer.pause();
    playPauseBtn.textContent = "Play";
  }
});


prevBtn.addEventListener("click", () => {
  if (currentTrackIndex > 0) {
    currentTrackIndex--;
    playTrack(currentTrackIndex);
  }
});


nextBtn.addEventListener("click", () => {
  if (currentTrackIndex < musicFiles.length - 1) {
    currentTrackIndex++;
    playTrack(currentTrackIndex);
  }
});

function saveToLocalStorage() {
  const musicData = musicFiles.map(file => ({ name: file.name, url: file.url }));
  localStorage.setItem("musicFiles", JSON.stringify(musicData));
}

function loadFromLocalStorage() {
  const savedMusicData = localStorage.getItem("musicFiles");
  if (savedMusicData) {
    musicFiles = JSON.parse(savedMusicData);
    updatePlaylist();
  }
}


function deleteSong(index) {
  musicFiles.splice(index, 1);
  saveToLocalStorage();
  updatePlaylist();
}

loadFromLocalStorage();


addMusicBtn.addEventListener("click", addMusic);