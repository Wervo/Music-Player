const image = document.getElementById("image-cover");
const title = document.getElementById("music-title");
const author = document.getElementById("author-name");
const musicStartNumber = document.getElementById("music-beginning-number");
const musicEndNumber = document.getElementById("music-end-number");
const progressBar = document.getElementById("progress");
const previous = document.getElementById("backward-music");
const next = document.getElementById("forward-music");
const play = document.querySelector(".play");
const pause = document.querySelector(".pause");
const audio = document.getElementById("audio-music"); 

const musicData = [
    {
    "id":1,
    "image": "images/cover-1.png",
    "title":"Lost in the City Lights",
    "author":"Cosmo Sheldrake",
    "audio": "music/lost-in-city-lights-145038.mp3"
},
{
    "id":2,
    "image": "images/cover-2.png",
    "title":"Forest Lullaby",
    "author":"Lesfm",
    "audio":"music/forest-lullaby-110624.mp3"
}];


let index = 0; // Initialize index to track current music

function playAudio() {
    const currentTrack = musicData[index]; 
    image.src = currentTrack.image;
    title.textContent = currentTrack.title; 
    author.textContent = currentTrack.author; 
    audio.src = currentTrack.audio; 
    audio.play(); 
}


let isPlaying = false; // Variable to track whether the music is currently playing

play.addEventListener("click", function() {
    if (audio.paused) {
        audio.play();
        play.style.display = "none";
        pause.style.display = "flex";
    } else {
        audio.pause();
        play.style.display = "flex";
        pause.style.display = "none";
    }
});


pause.addEventListener("click", function() {
    if (audio.paused) {
        audio.play();
        play.style.display = "none";
        pause.style.display = "flex";
    } else {
        audio.pause();
        play.style.display = "flex";
        pause.style.display = "none";
    }
});

// Function to move to the next song when the current one ends
function musicEnd() {
    index = (index + 1) % musicData.length;
    audio.src = musicData[index].audio;
    playAudio(); //Updates the title, image, audio, etc. 
}
audio.addEventListener("ended", musicEnd);

next.addEventListener("click", function() {
    index = (index + 1) % musicData.length;
    playAudio(); 

    if (audio.paused) {
        audio.play();
    } 
    updatePlayPauseButton();

});

previous.addEventListener("click", function() {
    index = (index - 1 + musicData.length) % musicData.length;
    playAudio(); 

    if (audio.paused) {
        audio.play();
    } 
    updatePlayPauseButton();
});

function updatePlayPauseButton() {
    if (audio.paused) {
        // Change the image to the play button
        play.style.display = "flex";
        pause.style.display = "none";
    } else {
        // Change the image to the pause button
        play.style.display = "none";
        pause.style.display = "flex";
    }
}

// Function to format time in MM:SS format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Function to update progress bar and current time display
function updateProgressBar() {
    const updateProgress = (audio.currentTime / audio.duration) * 100;
    progress.value = updateProgress;
    musicStartNumber.textContent = formatTime(audio.currentTime);

    if (updateProgress) {
        progress.value = updateProgress;
    }
    requestAnimationFrame(updateProgressBar);
}
updateProgressBar();
audio.addEventListener("timeupdate", updateProgressBar);


progress.addEventListener("input", function() {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

audio.addEventListener("timeupdate", function() {
    const updateProgress = (audio.currentTime / audio.duration) * 100;

    progress.value = updateProgress;
});

audio.addEventListener("loadedmetadata", function() {
    musicEndNumber.textContent = formatTime(audio.duration);
});