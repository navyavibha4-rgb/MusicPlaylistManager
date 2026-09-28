let songs = [];
const songForm = document.getElementById("songForm");
const songTitle = document.getElementById("songTitle");
const artist = document.getElementById("artist");
const duration = document.getElementById("duration");
const genre = document.getElementById("genre");
const playlistContainer = document.getElementById("playlistContainer");
const emptyMessage = document.getElementById("emptyMessage");
function durationToSeconds(durationText) 
{
    const parts = durationText.split(":");
    const minutes = Number(parts[0]);
    const seconds = Number(parts[1]);
    return (minutes * 60) + seconds;
}
function formatDuration(totalSeconds) 
{
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
}
function isValidDuration(durationText) 
{
    const parts = durationText.split(":");
    if (parts.length !== 2) 
    {
        return false;
    }
    const minutes = Number(parts[0]);
    const seconds = Number(parts[1]);
    if (Number.isNaN(minutes) || Number.isNaN(seconds)) 
    {
        return false;
    }
    if (minutes < 0) 
    {
        return false;
    }
    if (seconds < 0 || seconds > 59) 
    {
        return false;
    }
    return true;
}
function addSong() 
{
    const titleValue = songTitle.value.trim();
    const artistValue = artist.value.trim();
    const durationValue = duration.value.trim();
    const genreValue = genre.value;
    if (titleValue === "") 
    {
        alert("Please enter the song name.");
        songTitle.focus();
        return;
    }
    if (artistValue === "") 
    {
        alert("Please enter the artist name.");
        artist.focus();
        return;
    }
    if (durationValue === "") 
    {
        alert("Please enter the song duration.");
        duration.focus();
        return;
    }
    if (!isValidDuration(durationValue)) 
    {
        alert("Please enter duration in MM:SS format.\nExample: 4:25");
        duration.focus();
        return;
    }
    if (genreValue === "") 
    {
        alert("Please select a genre.");
        genre.focus();
        return;
    }
    const newSong = {
        id: Date.now(),
        title: titleValue,
        artist: artistValue,
        duration: durationToSeconds(durationValue),
        genre: genreValue,
        favorite: false
    };
    songs.push(newSong);
    renderSongs();
    songForm.reset();
    alert("Song added successfully!");
}
function renderSongs() 
{
    playlistContainer.innerHTML = "";
    if (songs.length === 0) 
    {
        emptyMessage.style.display = "block";
        return;
    } 
    else 
    {
        emptyMessage.style.display = "none";
    }
    songs.forEach(function(song) 
    {
        const card = document.createElement("div");
        card.className = "song-card";
        card.innerHTML = `
            <h3>${song.title}</h3>
            <p class="artist">Artist: ${song.artist} </p>
            <div class="song-info">
                <p>Genre: ${song.genre} </p>
                <p>Duration: ${formatDuration(song.duration)}</p>
            </div>
            <div class="song-actions">
                <button
                    class="play-btn"
                    onclick="selectSong(${song.id})">
                    Select
                </button>
                <button
                    class="remove-btn"
                    onclick="removeSong(${song.id})">
                    Remove
                </button>
            </div>`;
        playlistContainer.appendChild(card);
    });
}
function selectSong(id) 
{
    const cards = document.querySelectorAll(".song-card");
    cards.forEach(function(card) 
    {
        card.classList.remove("selected");
    });
    const songIndex = songs.findIndex(function(song) 
    {
            return song.id === id;
    });
    if (songIndex === -1) 
    {
        return;
    }
    const selectedCard = cards[songIndex];
    selectedCard.classList.add("selected");
    alert(`"${songs[songIndex].title}" selected.`);
}
function removeSong(id) {
    const song = songs.find(function(song) {
            return song.id === id;
        });
    if (!song) {
        return;
    }
    const confirmRemove = confirm(`Do you want to remove "${song.title}"?`);
    if (!confirmRemove) {
        return;
    }
    songs = songs.filter(function(song)
        {
            return song.id !== id;
        });
    renderSongs();
}
songForm.addEventListener(
    "submit",
    function(event) {
        event.preventDefault();
        addSong();
    }
);
renderSongs();
