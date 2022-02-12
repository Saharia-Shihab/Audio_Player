import New from './newElem.js';
import Svg from './newSVG.js';
import MetaData from './MetaData.js';
const _Length = MetaData.length;


/** @type {HTMLDivElement} */
const rootApp = document.querySelector('#app');

/**
 * @param {number} _Time
 * @returns {string}
 */
function reconvert(_Time) {
    let hours = `${Math.floor(_Time / 3600)}`;
    let minutes = `${Math.floor((_Time % 3600) / 60)}`;
    let seconds = `${Math.floor(_Time % 60)}`;
    seconds = String(seconds).padStart(2, "0");
    minutes = String(minutes).padStart(1);
    hours = String(hours).padStart(1);
    if (Number(_Time) < 3600) {
        return (minutes + ":" + seconds);
    } else {
        return (hours + ":" + minutes + ":" + seconds);
    }
}


/**
 * @param {string} _src
 * @param {string} DurOrCur
 */
function Music(_src, DurOrCur) {
    const NewMusic = new Audio(_src);
    return new Promise(function (resolve) {
        NewMusic.addEventListener('loadeddata', () => {
            if (DurOrCur === "duration") {
                resolve(reconvert(NewMusic.duration));
            } else if (DurOrCur === "current") {
                resolve(reconvert(NewMusic.currentTime));
            } else {
                resolve('!');
            }
        });
    });
};


let _isPlaying = false;
/**
 * @param {HTMLAudioElement} MusicPlayer
 * @param {string} SongName
 * @param {string} Artist
 * @param {string} Album
 * @param {number} Released
 * @param {string} Image
 * @param {string} _src
 * @param {number} index
 * @returns {Promise}
 */

export default function (MusicPlayer, SongName, Artist, Album, Released, Image, _src, index) {
    document.querySelector('.logs_fetching').innerHTML = `<svg viewBox="0 0 24 24" class="fetching" xmlns="http://www.w3.org/2000/svg"><path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/></svg>Fetching...`;
    return new Promise(async function (resolve, reject) {
        MusicPlayer.removeAttribute("loop");
        const Header = New('div', {
            class: "header"
        }, 'Playing Now...');
        const ThumbnailContainer = New('div', {
            class: "thumbnail_container",
            id: "Song_Thumbnail"
        },
            New('img', {
                src: `${Image}`,
                alt: `${SongName}`
            })
        );
        const BodyContainer = New('div', {
            class: 'body_container'
        },
            New('div', {
                id: 'Song_Title'
            }, SongName),
            New('div', {
                id: 'Song_Album'
            }, Album)
        );
        const progressLine = New('div', {
            class: 'progress_line'
        });
        const progressAmount = New('div', {
            class: 'progress_amount'
        });

        const progressIndicator = New('div', {
            class: 'progress_indicator'
        });
        const progressList = New('div', {
            class: 'progress_list'
        }, progressLine, progressAmount, progressIndicator);
        const ProgressBar = New('div', {
            class: 'progress_bar',
        }, progressList);

        const currentTime = New('div', {
            class: 'currentTime'
        });
        const durationTime = New('div', {
            class: 'durationTime'
        });

        currentTime.innerHTML = `${await Music(_src, "current")}`;
        durationTime.innerHTML = `${await Music(_src, "duration")}`;

        await Music(_src, "").then(() => {
            Array.from(document.querySelectorAll('.sidebar_item.isActive')).forEach(elements => {
                elements.classList.remove('isActive');
            });
            document.querySelectorAll('.sidebar_item')[index].classList.add('isActive');
            localStorage.setItem('Default', `${index}`);
            MusicPlayer.setAttribute('src', _src);
        });

        MusicPlayer.addEventListener('timeupdate', () => {
            if (!MusicPlayer) {
                console.log("audio not loaded properly or not supported by browser try another audio");
                return;
            }
            const current = MusicPlayer.currentTime;
            const duration = MusicPlayer.duration;
            const Percentage = ((current / duration) * 100);
            if (duration > 0) {
                progressAmount.style.width = `${(Percentage)}%`;
                progressIndicator.style.left = `${(Percentage)}%`;
            }
            currentTime.innerHTML = `${reconvert(Number(MusicPlayer.currentTime.toFixed(0)))}`;
        });

        MusicPlayer.addEventListener('loadeddata', () => {
            document.querySelector('.logs_fetching').innerHTML = ``;
            if (_isPlaying === true) {
                const playPromise = MusicPlayer.play();
                if (playPromise !== undefined) {
                    playPromise.then(_ => {
                        document.querySelector('.logs_fetching').innerHTML = ``;
                    }).catch(err => {
                        document.querySelector('.logs_fetching').innerHTML = `${err}...`;
                    });
                }
            }
        });

        const AudioTimes = New('div', {
            class: 'audio_times'
        }, currentTime, durationTime);

        const RepeatButton = New('button', {
            class: 'ripple_effect',
            id: 'RepeatButton',
            onclick: function () {
                const REPEAT = MusicPlayer.matches('[loop]');
                /** @type {SVGPathElement} */
                const svgPath = this.querySelector('svg > path');
                if (!REPEAT) {
                    MusicPlayer.setAttribute("loop", "");
                    svgPath.setAttributeNS(null, "d", 'M13,15V9H12L10,10V11H11.5V15M17,17H7V14L3,18L7,22V19H19V13H17M7,7H17V10L21,6L17,2V5H5V11H7V7Z');
                } else {
                    MusicPlayer.removeAttribute("loop");
                    svgPath.setAttributeNS(null, "d", 'M2,5.27L3.28,4L20,20.72L18.73,22L15.73,19H7V22L3,18L7,14V17H13.73L7,10.27V11H5V8.27L2,5.27M17,13H19V17.18L17,15.18V13M17,5V2L21,6L17,10V7H8.82L6.82,5H17Z');
                }
            }
        },
            Svg('svg', {
                viewBox: "0 0 24 24"
            },
                Svg('path', {
                    d: "M2,5.27L3.28,4L20,20.72L18.73,22L15.73,19H7V22L3,18L7,14V17H13.73L7,10.27V11H5V8.27L2,5.27M17,13H19V17.18L17,15.18V13M17,5V2L21,6L17,10V7H8.82L6.82,5H17Z"
                })
            )
        );
        const PreviousButton = New('button', {
            class: 'ripple_effect',
            id: 'PreviousButton',
            onclick: function () {
                let Active = (Number(localStorage.getItem('Default')) || 0) - 1;
                if (Active === -1) {
                    Active = _Length - 1;
                }
                // @ts-ignore
                const doActive = document.querySelectorAll('.sidebar_item')[Active].click();
            }
        },
            Svg('svg', {
                viewBox: "0 0 24 24"
            },
                Svg('path', {
                    d: "M6,6H8V18H6M9.5,12L18,18V6M16,14.14L12.97,12L16,9.86V14.14Z"
                })
            )
        );

        const PlayPauseButton = New('button', {
            class: 'ripple_effect',
            id: 'PlayPauseButton',
            onclick: function () {
                if (MusicPlayer.paused || MusicPlayer.ended) {
                    const playPromise = MusicPlayer.play();
                    if (playPromise !== undefined) {
                        playPromise.then(_ => _isPlaying = true).catch(err => _isPlaying = false);
                    }
                } else {
                    _isPlaying = false;
                    MusicPlayer.pause();
                }
            }
        },
            Svg('svg', {
                viewBox: "0 0 24 24"
            },
                Svg('path', {
                    d: _isPlaying === false ? "M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" : "M14,19H18V5H14M6,19H10V5H6V19Z",
                })
            )
        );
        const NextButton = New('button', {
            class: 'ripple_effect',
            id: 'NextButton',
            onclick: function () {
                let Active = (Number(localStorage.getItem('Default')) || 0) + 1;
                if (Active === _Length) {
                    Active = 0;
                }
                // @ts-ignore
                const doActive = document.querySelectorAll('.sidebar_item')[Active].click();
            }
        },
            Svg('svg', {
                viewBox: "0 0 24 24"
            },
                Svg('path', {
                    d: "M6,18L14.5,12L6,6M8,9.86L11.03,12L8,14.14M16,6H18V18H16"
                })
            )
        );
        const InfoButton = New('button', {
            class: 'ripple_effect',
            id: 'InfoButton',
            onclick: function () {
                rootApp.append(
                    New('div', {
                        class: 'info_container',
                        id: 'Time_Matters'
                    },
                        New('div', {
                            class: 'info_texts'
                        },
                            New('span', {
                                class: 'info_icon'
                            },
                                Svg('svg', {
                                    viewBox: '0 0 24 24'
                                },
                                    Svg('path', {
                                        d: 'M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z'
                                    })
                                )
                            ),
                            New('span', { class: 'texts_text' }, 'Info...'),
                            New('span', {
                                class: 'info_icon ripple_effect',
                                id: 'Close_Info',
                                onclick: function () {
                                    rootApp.querySelector('#Time_Matters').animate([{
                                        minHeight: "100%",
                                        height: "100%",
                                        maxHeight: "100%",
                                        opacity: 1
                                    }, {
                                        minHeight: "0%",
                                        height: "0%",
                                        maxHeight: "0%",
                                        opacity: 0
                                    }], {
                                        duration: 240,
                                        easing: "linear",
                                        fill: 'forwards'
                                    }).addEventListener('finish', () => {
                                        rootApp.querySelector('#Time_Matters').remove();
                                    });
                                }
                            },
                                Svg('svg', {
                                    viewBox: '0 0 24 24'
                                },
                                    Svg('path', {
                                        d: 'M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z'
                                    })
                                )
                            )
                        ),
                        New('div', {
                            class: "info_body"
                        },
                            New('img', {
                                src: Image, style: {
                                    borderRadius: "8px",
                                    marginBottom: "8px"
                                }
                            }),
                            New('div', { id: 'Info_Title' }, `Song: ${SongName}`),
                            New('div', { id: 'Info_Artist' }, `Artist: ${Artist}`),
                            New('div', {
                                id: 'Info_Album', style: {
                                    marginBottom: "2px"
                                }
                            }, `Album: ${Album}`),
                            New('div', { id: 'Info_Released' }, `Released: ${Released}`)
                        )
                    )
                );
                rootApp.querySelector('#Time_Matters').animate([{
                    minHeight: "0%",
                    height: "0%",
                    maxHeight: "0%",
                    opacity: 0,
                }, {
                    minHeight: "100%",
                    height: "100%",
                    maxHeight: "100%",
                    opacity: 1
                }], {
                    duration: 240,
                    easing: "linear",
                    fill: 'forwards'
                });
            }
        },
            Svg('svg', {
                viewBox: "0 0 24 24"
            },
                Svg('path', {
                    d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
                })
            )
        );

        function PLAY_PAUSE_UPDATE() {
            /** @type {SVGPathElement} */
            const svgPath = PlayPauseButton.querySelector('svg > path');
            if (!MusicPlayer.paused) {
                _isPlaying = true;
                PlayPauseButton.innerHTML = "";
                PlayPauseButton.append(
                    Svg('svg', { viewBox: "0 0 24 24" },
                        Svg('path', {
                            d: "M14,19H18V5H14M6,19H10V5H6V19Z",
                        })
                    )
                );
            } else if (MusicPlayer.ended) {
                if (MusicPlayer.loop === false) {
                    _isPlaying = false;
                    PlayPauseButton.innerHTML = "";
                    PlayPauseButton.append(
                        Svg('svg', { viewBox: "0 0 24 24" },
                            Svg('path', {
                                d: "M12 5V2.21c0-.45-.54-.67-.85-.35l-3.8 3.79c-.2.2-.2.51 0 .71l3.79 3.79c.32.31.86.09.86-.36V7c3.73 0 6.68 3.42 5.86 7.29-.47 2.27-2.31 4.1-4.57 4.57-3.57.75-6.75-1.7-7.23-5.01-.07-.48-.49-.85-.98-.85-.6 0-1.08.53-1 1.13.62 4.39 4.8 7.64 9.53 6.72 3.12-.61 5.63-3.12 6.24-6.24C20.84 9.48 16.94 5 12 5z",
                            })
                        )
                    );
                }
            } else {
                _isPlaying = false;
                PlayPauseButton.innerHTML = "";
                PlayPauseButton.append(
                    Svg('svg', { viewBox: "0 0 24 24" },
                        Svg('path', {
                            d: "M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z",
                        })
                    )
                );
            }
        };
        MusicPlayer.addEventListener('play', PLAY_PAUSE_UPDATE);
        MusicPlayer.addEventListener('pause', PLAY_PAUSE_UPDATE);
        MusicPlayer.addEventListener('ended', PLAY_PAUSE_UPDATE);

        rootApp.innerHTML = '';
        rootApp.className = '';
        try {
            const _App = document.createDocumentFragment();
            _App.append(
                Header,
                ThumbnailContainer,
                BodyContainer,
                ProgressBar,
                AudioTimes,
                New('div', { class: 'controls_container' },
                    RepeatButton,
                    PreviousButton,
                    PlayPauseButton,
                    NextButton,
                    InfoButton
                ));
            resolve(_App);
        } catch (error) {
            reject(error);
        }
    });

}