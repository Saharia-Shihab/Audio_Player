import New from './bin/newElem.js';
import Svg from './bin/newSVG.js';
import ripple from './bin/ripple.js';
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
        NewMusic.addEventListener('loadedmetadata', () => {
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
            class: "header",
        },
            New('span', {
                class: "headerLogo",
            },
                Svg('svg', {
                    viewBox: "0 0 36 36",
                    width: "32px",
                    height: "32px"
                },
                    Svg('path', {
                        fill: "#77B255",
                        d: "M28.938 27.441c-2.554-.89-8.111-.429-9.938 1.331V17c0-.553-.447-1-1-1s-1 .447-1 1v11.772c-1.827-1.76-7.384-2.221-9.938-1.331-.741.259 5.264 8.749 9.507 4.507.168-.168.306-.33.431-.49V35c0 .553.447 1 1 1s1-.447 1-1v-3.542c.125.16.263.322.431.49 4.243 4.242 10.248-4.248 9.507-4.507z"
                    }),
                    Svg('path', {
                        fill: "#CCD6DD",
                        d: "M12.562 25.65c-.619-.266-1.107-.837-1.378-1.513l-1.266-3.306-3.258-1.393c-1.336-.574-1.876-1.922-1.304-3.259l1.362-3.181-1.364-3.269c-.541-1.35.15-2.868 1.5-3.408l3.272-1.281 1.449-3.384C12.148.32 13.496-.22 14.833.352l3.258 1.396L21.358.382c.675-.271 1.411-.276 2.03-.011.619.265 1.114.819 1.385 1.494l1.274 3.29 3.309 1.417c1.336.572 1.875 1.921 1.305 3.258l-1.451 3.384 1.365 3.267c.541 1.35-.15 2.866-1.5 3.407l-3.271 1.281-1.363 3.183c-.572 1.336-1.922 1.877-3.258 1.305l-3.308-1.417-3.267 1.364c-.676.271-1.427.311-2.046.046z"
                    }),
                    Svg('path', {
                        fill: "#E1E8ED",
                        d: "M29.356 6.572l-3.309-1.417-.055-.143c-1.565 1.337-5.215 4.354-5.215 4.354l.007.123C20.015 8.879 19.057 8.5 18 8.5V1.709L14.833.353c-1.337-.572-2.685-.032-3.258 1.304l-1.449 3.384-.061.024 4.753 4.754c-.814.813-1.318 1.938-1.318 3.181H6.717l-1.361 3.178c-.572 1.337-.032 2.686 1.304 3.259l3.258 1.394.002.006 4.496-5.142c.822 1.09 2.115 1.805 3.584 1.805h.005c.006 1.979.015 5.273.012 6.801l3.164 1.356c1.336.572 2.686.031 3.258-1.305l1.362-3.18-5.192-4.517c1.14-.816 1.89-2.145 1.89-3.654 0-.071-.018-.137-.021-.208 1.802.182 4.951.472 6.822.642l-.092-.22L30.66 9.83c.571-1.337.031-2.686-1.304-3.258z"
                    }),
                    Svg('circle', {
                        fill: "#F4900C",
                        cx: 18,
                        cy: 13,
                        r: 5
                    })
                ),
            ),
            New('span', {
                class: "headerText"
            }, 'Playing Now...'),
            New('span', {
                class: 'headerLogo ripple_effect',
                style: {
                    cursor: 'pointer',
                },
                onclick: function () {
                    // document.querySelector('aside.sidebar')
                    const isMobile = document.body.matches('[class="isMobile"]');
                    if (isMobile) {
                        const OverLay = New('div', {
                            id: "isOverLay",
                            style: {
                                position: 'fixed',
                                top: '0px',
                                left: '0px',
                                bottom: '0px',
                                right: '0px',
                                width: '100vw',
                                height: '100vh',
                                backgroundColor: '#0009',
                                transition: 'opacity 200ms',
                                opacity: '0',
                                zIndex: '-1',
                                visibility: 'hidden',
                                cursor: 'default'
                            }
                        });
                        document.body.append(OverLay);
                        document.querySelector('aside.sidebar').classList.add('isOpen');
                        OverLay.animate([{
                            opacity: '0',
                            visibility: 'hidden',
                            zIndex: '-1'
                        }, {
                            opacity: '1',
                            visibility: 'visible',
                            zIndex: '138'
                        }], {
                            duration: 225,
                            easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
                            fill: 'forwards'
                        });
                        OverLay.addEventListener('click', () => {
                            document.querySelector('aside.sidebar').classList.remove('isOpen');
                            OverLay.animate([{
                                opacity: '1',
                                visibility: 'visible',
                                zIndex: '138'
                            }, {
                                opacity: '0',
                                visibility: 'hidden',
                                zIndex: '-1'
                            }], {
                                duration: 225,
                                easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
                                fill: 'forwards'
                            }).addEventListener("finish", () => {
                                OverLay.remove();
                            });
                        })
                    } else {

                    }
                }
            },
                Svg('svg', {
                    viewBox: "0 0 24 24",
                    width: "32px",
                    height: "32px"
                },
                    Svg('path', {
                        d: "M15,6V8H3V6H15M15,10V12H3V10H15M3,16V14H11V16H3M17,6H22V8H19V17A3,3 0 0,1 16,20A3,3 0 0,1 13,17A3,3 0 0,1 16,14C16.35,14 16.69,14.07 17,14.18V6M16,16A1,1 0 0,0 15,17A1,1 0 0,0 16,18A1,1 0 0,0 17,17A1,1 0 0,0 16,16Z"
                    })
                )
            )
        );
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
            document.querySelector('aside.sidebar').classList.remove('isOpen');
            document.querySelector('#isOverLay') ? document.querySelector('#isOverLay').remove() : null;
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

        MusicPlayer.addEventListener('loadedmetadata', async () => {
            document.querySelector('.logs_fetching').innerHTML = ``;
            if (_isPlaying === true) {
                await MusicPlayer.play()
                    .then(_ => {
                        document.querySelector('.logs_fetching').innerHTML = ``;
                        if ('mediaSession' in navigator) {
                            const mqdefault = Image.replace('maxresdefault', 'mqdefault');
                            navigator.mediaSession.metadata = new MediaMetadata({
                                title: SongName,
                                artist: Artist,
                                album: Album,
                                artwork: [
                                    {
                                        src: mqdefault,
                                        sizes: "320x180",
                                        type: "image/jpeg"
                                    }
                                ]
                            });
                        }
                        /* if ('setPositionState' in navigator.mediaSession) {
                            navigator.mediaSession.setActionHandler('seekbackward', null);
                            navigator.mediaSession.setActionHandler('seekforward', null);
                            navigator.mediaSession.setPositionState({
                                duration: MusicPlayer.duration,
                                playbackRate: MusicPlayer.playbackRate,
                                position: MusicPlayer.currentTime
                            });
                        } */
                    }).catch(err => {
                        document.querySelector('.logs_fetching').innerHTML = `${err}...`;
                    });
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

                        playPromise.then(_ => { _isPlaying = true }).catch(err => { });
                    }
                } else {
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
        navigator.mediaSession.setActionHandler('previoustrack', function () {
            PreviousButton.click();
        });
        navigator.mediaSession.setActionHandler('nexttrack', function () {
            NextButton.click();
        });
        const InfoButton = New('button', {
            class: 'ripple_effect',
            id: 'InfoButton',
            onclick: async function () {
                const Elem = async () => {
                    try {
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
                                                transform: 'scaleY(1)',
                                                opacity: 1
                                            }, {
                                                transform: 'scaleY(0)',
                                                opacity: 0
                                            }], {
                                                duration: 225,
                                                easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
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
                    } catch (error) {

                    }
                };
                await Elem().then(() => {
                    ripple();
                });
                rootApp.querySelector('#Time_Matters').animate([{
                    transform: 'scaleY(0)',
                    opacity: 0,
                }, {
                    transform: 'scaleY(1)',
                    opacity: 1
                }], {
                    duration: 225,
                    easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
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
                svgPath.setAttributeNS(null, 'd', "M14,19H18V5H14M6,19H10V5H6V19Z");
                navigator.mediaSession.playbackState = 'playing';
            } else if (MusicPlayer.ended) {
                if (MusicPlayer.loop === false) {
                    const _Loop = document.body.matches('[loop]');
                    const Active = (Number(localStorage.getItem('Default')) || 0) + 1;
                    if (!_Loop && Active === _Length) {
                        navigator.mediaSession.playbackState = 'paused';
                        svgPath.setAttributeNS(null, 'd', "M12 5V2.21c0-.45-.54-.67-.85-.35l-3.8 3.79c-.2.2-.2.51 0 .71l3.79 3.79c.32.31.86.09.86-.36V7c3.73 0 6.68 3.42 5.86 7.29-.47 2.27-2.31 4.1-4.57 4.57-3.57.75-6.75-1.7-7.23-5.01-.07-.48-.49-.85-.98-.85-.6 0-1.08.53-1 1.13.62 4.39 4.8 7.64 9.53 6.72 3.12-.61 5.63-3.12 6.24-6.24C20.84 9.48 16.94 5 12 5z");
                    } else {
                        NextButton.click();
                    }
                }
            } else {
                navigator.mediaSession.playbackState = 'paused';
                svgPath.setAttributeNS(null, 'd', "M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z")
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