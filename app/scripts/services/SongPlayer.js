

(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        // @desc sets album data from Fixtures
        var currentAlbum = Fixtures.getAlbum();
        // /**
        // * @desc Buzz object audio file
        // * @type {Object}
        // */
        var currentBuzzObject = null;
        // /**
        // * @function setSong
        // * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        // * @param {Object} song
        // */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
        }

        currentBuzzObject = new buzz.sound(song.audioUrl, {
            formats: ['mp3'],
            preload: true
        });

            SongPlayer.currentSong = song;
        };

        var playSong = function() {
            currentBuzzObject.play();
            SongPlayer.currentSong.playing = true;
        };
        // * @function private, getSongIndex
        // * @desc gets the index of the current song from the fixtures object
        // * @param {Object} song
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        SongPlayer.currentSong = null;
        // * @function play
        // * @desc Play current or new song
        // * @param {Object} song
        SongPlayer.play = function(song) {
            // if another song is selected the if statement will check to for status
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {

                setSong(song);

                playSong();

                } else if (SongPlayer.currentSong === song) {
                    if (currentBuzzObject.isPaused()) {
                        currentBuzzObject.play();
                    }
                }
        };
        // * @function pause
        // * @desc Pause current song
        // * @param {Object} song
        SongPlayer.pause = function(song) {
          song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        // * @function previous
        // * @desc playes the previous song
        // * @param none
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
            }
        };

        return SongPlayer;
    }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
