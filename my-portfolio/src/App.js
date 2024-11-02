// App.js
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [currentTab, setCurrentTab] = useState("home");
  const [nowPlaying, setNowPlaying] = useState(null);

  useEffect(() => {
    const username = 'JoshIsYes';
    const apiKey = '152dd7341991a250c5e0b7092879abd9';
    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`;

    async function fetchNowPlaying() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const track = data.recenttracks.track[0];
        if (track && track["@attr"] && track["@attr"].nowplaying) {
          setNowPlaying({
            artist: track.artist["#text"],
            songTitle: track.name,
            albumCover: track.image[2]["#text"] || ""
          });
        } else {
          setNowPlaying(null);
        }
      } catch (error) {
        console.error("Error fetching now playing data:", error);
      }
    }

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  const renderTabContent = () => {
    if (currentTab === "home") {
      return (
        <p>
          Hi, I'm Josh! I know HTML, CSS, and JavaScript, and I'm currently learning Swift, Python, and Godot. I enjoy creating websites and developing short games.
          <br /><br />
          One of my achievements is developing a <a href="https://teamtripwire.glitch.me" className="squiggly-link">local offender tracker called Tripwire</a>, which won a school competition.
          I also run the <a href="https://barracoders.com/" className="squiggly-link">Beachside Barracoder's coding club</a>, where we collaborate on various projects, and I'm a member of
          <a href="https://hackclub.com/" className="squiggly-link">Hack Club International.</a>
        </p>
      );
    } else if (currentTab === "projects") {
      return <p>Projects content goes here.</p>;
    } else if (currentTab === "more") {
      return <p>More content goes here.</p>;
    }
  };

  return (
    <div className="container fade-in">
      <div className="profile">
        <img src="/images/turtle-logo.jpeg" alt="Profile" className="pfp" loading="lazy" />
        <div className="info">
          <h1>Josh Worthington</h1>
          <div className="links">
            <a href="https://github.com/i-suck-at-most-stuff" target="_blank" rel="noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://i-suck-at-most-stuff.itch.io/" target="_blank" rel="noreferrer">
              <i className="fab fa-itch-io"></i>
            </a>
            <a href="https://www.instagram.com/i_suck_at_most_stuff/" target="_blank" rel="noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://open.spotify.com/user/31gfbqbz2nxkljqdtcou6vx6lpbm" target="_blank" rel="noreferrer">
              <i className="fab fa-spotify"></i>
            </a>
          </div>
        </div>
      </div>

      <hr className="divider" />

      <div className="description">{renderTabContent()}</div>

      <div className="listening-container">
        <div className="newcenter">
          <div className="now-playing" id="nowPlaying">
            {nowPlaying ? (
              <>
                <img src={nowPlaying.albumCover} alt="Album cover" />
                <div className="track-info">
                  <p className="song-title">{nowPlaying.songTitle}</p>
                  <p className="artist-name">{nowPlaying.artist}</p>
                </div>
              </>
            ) : (
              <p>
                I'm not currently playing anything, <a href="https://open.spotify.com/playlist/5Xg7VGKGjjXBwwzoZDtR4d?pi=u-MzazJak1RPmo"><i className="fab fa-spotify"></i> feel free to check out my playlist though.</a>
              </p>
            )}
          </div>
        </div>
      </div>

      <hr className="divider" />

      <div className="tabs">
        <button onClick={() => setCurrentTab("home")}>Home</button>
        <button onClick={() => setCurrentTab("projects")}>Projects</button>
        <button onClick={() => setCurrentTab("more")}>More</button>
      </div>

      <footer>
        <p>Made by Joshua Worthington | <a href="https://github.com/i-suck-at-most-stuff/i-suck-at-most-stuff.github.io">Proudly Open Source <i className="fab fa-github"></i></a></p>
      </footer>
    </div>
  );
}

export default App;
