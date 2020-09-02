console.clear();

// Filters
// =======
Vue.filter('time', function(seconds) {
    var minutes = Math.floor(seconds / 60),
        seconds = Math.floor(seconds % 60);

    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    return minutes + ':' + seconds;
});

Vue.filter('minutes', function(seconds) {
    var minutes = Math.floor(seconds / 60);
    
    return minutes;
})

// App
// =====
new Vue({
    el: '.app',
    data: function() {
        return {
            player: {
                currentTrack: 0,
                elapsed: 0,
                playing: false,
                repeat: false,
                shuffle: true,
                volume: 68
            },
            playlist: {
                title: 'Designers MX - Open Space',
                author: 'Kyle Barret',
                tracks: [{
                    title: 'Window',
                    artist: 'The Album Leaf',
                    album: 'In a Safe Place',
                    duration: 274,
                    cover: {
                        small: 'http://is5.mzstatic.com/image/pf/us/r30/Music/y2004/m06/d11/h18/s05.tjsjltyd.100x100-75.jpg',
                        large: 'https://yuq.me/albums/79/690/3374011100.jpg'
                    }
                }, {
                    title: 'Dayvan Cowboy',
                    artist: 'Boards of Canada',
                    album: 'The Campfire Headphase',
                    duration: 300,
                    cover: {
                        small: 'http://static.metacritic.com/images/products/music/8/a0c6c84a9d3ef6a577aee9a32d0b5b6f-98.jpg',
                        large: 'http://boardsofcanada.com/vinyl-reissues/_/img/WARPLP123R-Packshot-800.jpg'
                    }
                }, {
                    title: 'Adrift',
                    artist: 'Tycho',
                    album: 'Awake',
                    duration: 283,
                    cover: {
                        small: 'http://cdn.ghostly.com/images/artists/34/albums/454/GI-208_1500x300_188_188.jpg',
                        large: 'http://cdn.ghostly.com/images/artists/34/albums/454/GI-208_1500x300_540_540.jpg'
                    }
                }, {
                    title: 'Arrival at Sydney Harbour',
                    artist: 'Port Blue',
                    album: 'The Airship',
                    duration: 306,
                    cover: {
                        small: 'https://upload.wikimedia.org/wikipedia/ru/thumb/3/31/Port_Blue_-_The_Airship.jpg/200px-Port_Blue_-_The_Airship.jpg',
                        large: 'https://upload.wikimedia.org/wikipedia/en/8/8f/Theairship.jpg'
                    }
                }, {
                    title: 'The Backwards Step',
                    artist: 'Hammock',
                    album: 'Chasing After Shadows',
                    duration: 289,
                    cover: {
                        small: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Chasing_after_shadows.jpg/100px-Chasing_after_shadows.jpg',
                        large: 'http://f1.bcbits.com/img/a3547927520_10.jpg'
                    }
                }]
            }
        }
    },
    computed: {
        currentTrack: function() {
            return this.playlist.tracks[this.player.currentTrack];
        },
        playlistDuration: function() {
            var duration = 0,
                tracks = this.playlist.tracks,
                i;
            
            for (i = 0; i < tracks.length; i += 1) {
                duration += tracks[i].duration;
            }
            
            return duration;
        }
    },
    methods: {
        pause: function() {
            if (!this.player.playing) {
                return;
            }
            this.$set('player.playing', false);
            clearInterval(this.timer);
            this.$set('timer', false);
        },
        play: function() {
            if (this.player.playing) {
                return;
            }
            var _this = this,
                timer = setInterval(function() {
                    if (_this.player.elapsed >= _this.currentTrack.duration) {
                        _this.$set('player.elapsed', 0);
                        _this.skipForward();
                    }
                    _this.player.elapsed += .1;
                }, 100);
            
            this.$set('player.playing', true);
            this.$set('timer', timer);
        },
        selectTrack: function(id) {
            this.$set('player.currentTrack', id);
            this.$set('player.elapsed', 0);
            this.play();
        },
        skipForward: function() {
            var track = this.player.currentTrack + 1;
            
            track = track % this.playlist.tracks.length;
            this.selectTrack(track);
        },
        skipBack: function() {
            var track = this.player.currentTrack;
            
            if (this.player.elapsed < 2) {
                track = track - 1;
            }
            
            if (track < 0) {
                track = 0;
            }
            
            this.selectTrack(track);
        },
        toggleRepeat: function() {
            this.player.repeat = !this.player.repeat;
        },
        toggleShuffle: function() {
            this.player.shuffle = !this.player.shuffle;
        }
    }
});