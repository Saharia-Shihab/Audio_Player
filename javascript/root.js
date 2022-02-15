import newElem from './bin/newElem.js';
import newSVG from './bin/newSVG.js';
import ripple from './bin/ripple.js';
import MetaData from './MetaData.js';
const _Length = MetaData.length;

const Elements = {
    /** @type {HTMLElement} */
    AsideBar: document.querySelector('aside#Sidebar'),
    /** @type {HTMLDivElement} */
    rootApp: document.querySelector('#root > div#app'),
    /** @type {HTMLAudioElement} */
    MusicPlayer: document.querySelector('#root > audio#MusicDiv'),
}

/** @type {Boolean} */
let _isPlaying = false;
/** @type {number} */
let _OffSetLeft;
/** @type {Boolean} */
let ProgressDrag;

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

Array.from(["load", "resize"]).forEach((_event) => {
    window.addEventListener(_event, () => {
        _OffSetLeft = Number(Elements.rootApp.offsetLeft + 16);
    });
});

/**
 * @param {{Image: string;Title: string;Artist: string;Album: string;}} _Music
 * @param {HTMLElement} PreviousButton
 * @param {HTMLElement} NextButton
 */
function NewMetaData(_Music, PreviousButton, NextButton) {
    if ('mediaSession' in navigator) {
        const mqdefault = _Music.Image.replace('maxresdefault', 'mqdefault');
        navigator.mediaSession.metadata = new MediaMetadata({
            title: _Music.Title,
            artist: _Music.Artist,
            album: _Music.Album,
            artwork: [
                {
                    src: mqdefault,
                    sizes: "320x180",
                    type: "image/jpeg"
                }
            ]
        });
        navigator.mediaSession.setActionHandler('previoustrack', function () {
            PreviousButton.click();
        });
        navigator.mediaSession.setActionHandler('nexttrack', function () {
            NextButton.click();
        });
    }
}

/**
 * @param {{Title: string;Artist: string;Album: string;Released: number;Image: string;_src: string;}[]} MusicList
 * @param {number} index
 * @param {{ (Player: {Player: HTMLAudioElement; Title: string; Artist: string; Album: string; Released: number;Image: string ;_src: string;}, error: string): string; (arg0: any, arg1: any): any; }} loadcallback
 */
async function FetchMusic(MusicList, index, loadcallback) {
    document.querySelector('.logs_fetching').innerHTML = `<svg viewBox="0 0 24 24" class="fetching" xmlns="http://www.w3.org/2000/svg"><path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/></svg>Fetching...`;
    const newPromise = new Promise(async function (resolve, reject) {
        Elements.MusicPlayer.setAttribute("src", MusicList[index]._src);
        Elements.MusicPlayer.addEventListener('loadedmetadata', function () {
            document.querySelector('.logs_fetching').innerHTML = ``;
            resolve({
                Player: this,
                Title: MusicList[index].Title,
                Artist: MusicList[index].Artist,
                Album: MusicList[index].Album,
                Released: MusicList[index].Released,
                Image: MusicList[index].Image,
                _src: MusicList[index]._src,
            });
        });
    });
    try {
        const SingleMusic = await newPromise;
        return loadcallback(SingleMusic, null);
    } catch (error) {
        return loadcallback(null, error);
    }
}

const AsideApp = () => {
    const AsideHeader =
        newElem('header', { class: "sidebar_header" },
            newElem('span', { class: "headerButton" },
                newSVG('svg', { viewBox: "0 0 36 36" },
                    newSVG('path', {
                        fill: "#DD2E44",
                        d: "M36 20.917c0-.688-2.895-.5-3.125-1s3.208-4.584 2.708-5.5-5.086 1.167-5.375.708c-.288-.458.292-3.5-.208-3.875s-5.25 4.916-5.917 4.292c-.666-.625 1.542-10.5 1.086-10.698-.456-.198-3.419 1.365-3.793 1.282C21.002 6.042 18.682 0 18 0s-3.002 6.042-3.376 6.125c-.374.083-3.337-1.48-3.793-1.282-.456.198 1.752 10.073 1.085 10.698C11.25 16.166 6.5 10.875 6 11.25s.08 3.417-.208 3.875c-.289.458-4.875-1.625-5.375-.708s2.939 5 2.708 5.5-3.125.312-3.125 1 8.438 5.235 9 5.771c.562.535-2.914 2.802-2.417 3.229.576.496 3.839-.83 10.417-.957V35c0 .553.448 1 1 1 .553 0 1-.447 1-1v-6.04c6.577.127 9.841 1.453 10.417.957.496-.428-2.979-2.694-2.417-3.229.562-.536 9-5.084 9-5.771z"
                    })
                )
            ),
            newElem('span', { class: "headerText" }, "Music"),
            newElem('span', {
                class: "headerLogo ripple_effect",
                id: "LoopButton",
                style: {
                    cursor: 'pointer',
                    padding: '12px'
                },
                onclick: function () {
                    const _Loop = document.body.matches('[loop]');
                    /** @type {SVGPathElement} */
                    const svgPath = this.querySelector('svg > path');
                    if (!_Loop) {
                        document.body.setAttribute("loop", "");
                        svgPath.setAttributeNS(null, "d", 'M17,17H7V14L3,18L7,22V19H19V13H17M7,7H17V10L21,6L17,2V5H5V11H7V7Z');
                    } else {
                        document.body.removeAttribute("loop");
                        svgPath.setAttributeNS(null, "d", 'M2,5.27L3.28,4L20,20.72L18.73,22L15.73,19H7V22L3,18L7,14V17H13.73L7,10.27V11H5V8.27L2,5.27M17,13H19V17.18L17,15.18V13M17,5V2L21,6L17,10V7H8.82L6.82,5H17Z');
                    }
                }
            },
                newSVG('svg', {
                    viewBox: "0 0 24 24",
                    width: '24px',
                    height: '24px'
                },
                    newSVG('path', {
                        d: "M2,5.27L3.28,4L20,20.72L18.73,22L15.73,19H7V22L3,18L7,14V17H13.73L7,10.27V11H5V8.27L2,5.27M17,13H19V17.18L17,15.18V13M17,5V2L21,6L17,10V7H8.82L6.82,5H17Z"
                    })
                )
            )
        );

    const AsideMusicList = () => {
        const EmptyElem = document.createDocumentFragment();
        [].forEach.call(MetaData, async function ({ Title, Artist, Album, Released, Image, _src }, /** @type {number} */ index) {
            EmptyElem.append(
                newElem('div', { class: "sidebar_item ripple_effect" },
                    newElem('span', {
                        class: 'sidebar_list'
                    }, `${index + 1}`),
                    newElem('div', { class: 'sidebar_context' },
                        newElem('span', { class: 'context_primary' }, `${Title}`),
                        newElem('span', { class: 'context_secondary' }, `By: ${Artist}`),
                    ),
                    newElem('span', { class: 'sidebar_info' })
                )
            )
        });
        return EmptyElem;
    };

    const AsideContainer = newElem('div', {
        class: "sidebar_container",
    }, AsideMusicList());

    const AsideMusic = document.createDocumentFragment();
    AsideMusic.append(AsideHeader, AsideContainer);
    return AsideMusic;
};

/**
 * @param {{Title: string, Artist: string, Album: string, Released: number, Image: string, _src: string}[]} MusicList 
 * @param {number} index
 */
function rootApp(MusicList, index) {
    const _Music = MusicList[index];
    const Header =
        newElem('div', { class: "header" },
            newElem('span', { class: "headerLogo" },
                newSVG('svg', {
                    viewBox: "0 0 36 36",
                    width: "32px",
                    height: "32px"
                },
                    newSVG('path', {
                        fill: "#77B255",
                        d: "M28.938 27.441c-2.554-.89-8.111-.429-9.938 1.331V17c0-.553-.447-1-1-1s-1 .447-1 1v11.772c-1.827-1.76-7.384-2.221-9.938-1.331-.741.259 5.264 8.749 9.507 4.507.168-.168.306-.33.431-.49V35c0 .553.447 1 1 1s1-.447 1-1v-3.542c.125.16.263.322.431.49 4.243 4.242 10.248-4.248 9.507-4.507z"
                    }),
                    newSVG('path', {
                        fill: "#CCD6DD",
                        d: "M12.562 25.65c-.619-.266-1.107-.837-1.378-1.513l-1.266-3.306-3.258-1.393c-1.336-.574-1.876-1.922-1.304-3.259l1.362-3.181-1.364-3.269c-.541-1.35.15-2.868 1.5-3.408l3.272-1.281 1.449-3.384C12.148.32 13.496-.22 14.833.352l3.258 1.396L21.358.382c.675-.271 1.411-.276 2.03-.011.619.265 1.114.819 1.385 1.494l1.274 3.29 3.309 1.417c1.336.572 1.875 1.921 1.305 3.258l-1.451 3.384 1.365 3.267c.541 1.35-.15 2.866-1.5 3.407l-3.271 1.281-1.363 3.183c-.572 1.336-1.922 1.877-3.258 1.305l-3.308-1.417-3.267 1.364c-.676.271-1.427.311-2.046.046z"
                    }),
                    newSVG('path', {
                        fill: "#E1E8ED",
                        d: "M29.356 6.572l-3.309-1.417-.055-.143c-1.565 1.337-5.215 4.354-5.215 4.354l.007.123C20.015 8.879 19.057 8.5 18 8.5V1.709L14.833.353c-1.337-.572-2.685-.032-3.258 1.304l-1.449 3.384-.061.024 4.753 4.754c-.814.813-1.318 1.938-1.318 3.181H6.717l-1.361 3.178c-.572 1.337-.032 2.686 1.304 3.259l3.258 1.394.002.006 4.496-5.142c.822 1.09 2.115 1.805 3.584 1.805h.005c.006 1.979.015 5.273.012 6.801l3.164 1.356c1.336.572 2.686.031 3.258-1.305l1.362-3.18-5.192-4.517c1.14-.816 1.89-2.145 1.89-3.654 0-.071-.018-.137-.021-.208 1.802.182 4.951.472 6.822.642l-.092-.22L30.66 9.83c.571-1.337.031-2.686-1.304-3.258z"
                    }),
                    newSVG('circle', {
                        fill: "#F4900C",
                        cx: 18,
                        cy: 13,
                        r: 5
                    })
                )
            ),
            newElem('span', {
                class: "headerText"
            }, 'Playing Now...'),
            newElem('span', {
                class: 'headerLogo ripple_effect',
                style: {
                    cursor: 'pointer',
                },
                onclick: function () {
                    const isMobile = document.body.matches('[class="isMobile"]');
                    if (isMobile) {
                        const OverLay = newElem('div', {
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
                                cursor: 'default'
                            }
                        });
                        document.body.append(OverLay);
                        document.querySelector('aside.sidebar').classList.add('isOpen');
                        OverLay.animate([{
                            opacity: '0',
                            zIndex: '-1'
                        }, {
                            opacity: '1',
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
                                zIndex: '138'
                            }, {
                                opacity: '0',
                                zIndex: '-1'
                            }], {
                                duration: 225,
                                easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
                                fill: 'forwards'
                            }).addEventListener("finish", () => {
                                OverLay.remove();
                            });
                        });
                    } else {
                    }
                }
            },
                newSVG('svg', {
                    viewBox: "0 0 24 24",
                    width: "32px",
                    height: "32px"
                },
                    newSVG('path', {
                        d: "M15,6V8H3V6H15M15,10V12H3V10H15M3,16V14H11V16H3M17,6H22V8H19V17A3,3 0 0,1 16,20A3,3 0 0,1 13,17A3,3 0 0,1 16,14C16.35,14 16.69,14.07 17,14.18V6M16,16A1,1 0 0,0 15,17A1,1 0 0,0 16,18A1,1 0 0,0 17,17A1,1 0 0,0 16,16Z"
                    })
                )
            )
        );
    const ThumbnailContainer =
        newElem('div', {
            class: "thumbnail_container",
            id: "Song_Thumbnail"
        },
            newElem('img', { src: _Music.Image })
        );
    const BodyContainer =
        newElem('div', { class: 'body_container' },
            newElem('div', {
                id: 'Song_Title'
            }, _Music.Title),
            newElem('div', {
                id: 'Song_Album'
            }, _Music.Album)
        );
    const progressLine =
        newElem('div', {
            class: 'progress_line'
        });
    const progressAmount =
        newElem('div', {
            class: 'progress_amount'
        });
    const progressIndicator =
        newElem('div', {
            class: 'progress_indicator'
        });
    const progressList =
        newElem('div', {
            class: 'progress_list'
        }, progressLine, progressAmount, progressIndicator);
    const ProgressBar =
        newElem('div', {
            class: 'progress_bar',
        }, progressList);
    const currentTime =
        newElem('div', {
            class: 'currentTime'
        });
    const durationTime =
        newElem('div', {
            class: 'durationTime'
        });
    const RepeatButton =
        newElem('button', {
            class: 'ripple_effect',
            id: 'RepeatButton',
            onclick: function () {
                const REPEAT = Elements.MusicPlayer.matches('[loop]');
                /** @type {SVGPathElement} */
                const svgPath = this.querySelector('svg > path');
                if (!REPEAT) {
                    Elements.MusicPlayer.setAttribute("loop", "");
                    svgPath.setAttributeNS(null, "d", 'M13,15V9H12L10,10V11H11.5V15M17,17H7V14L3,18L7,22V19H19V13H17M7,7H17V10L21,6L17,2V5H5V11H7V7Z');
                } else {
                    Elements.MusicPlayer.removeAttribute("loop");
                    svgPath.setAttributeNS(null, "d", 'M2,5.27L3.28,4L20,20.72L18.73,22L15.73,19H7V22L3,18L7,14V17H13.73L7,10.27V11H5V8.27L2,5.27M17,13H19V17.18L17,15.18V13M17,5V2L21,6L17,10V7H8.82L6.82,5H17Z');
                }
            }
        },
            newSVG('svg', {
                viewBox: "0 0 24 24"
            },
                newSVG('path', {
                    d: "M2,5.27L3.28,4L20,20.72L18.73,22L15.73,19H7V22L3,18L7,14V17H13.73L7,10.27V11H5V8.27L2,5.27M17,13H19V17.18L17,15.18V13M17,5V2L21,6L17,10V7H8.82L6.82,5H17Z"
                })
            )
        );
    const PreviousButton =
        newElem('button', {
            class: 'ripple_effect',
            id: 'PreviousButton',
            onclick: function () {
                let Active = (Number(localStorage.getItem('Default')) || 0) - 1;
                if (Active === -1) {
                    Active = _Length - 1;
                }
                // @ts-ignore
                document.querySelectorAll('.sidebar_item')[Active].click();
            }
        },
            newSVG('svg', {
                viewBox: "0 0 24 24"
            },
                newSVG('path', {
                    d: "M6,6H8V18H6M9.5,12L18,18V6M16,14.14L12.97,12L16,9.86V14.14Z"
                })
            )
        );
    const PlayPauseButton =
        newElem('button', {
            class: 'ripple_effect',
            id: 'PlayPauseButton',
            onclick: function () {
                if (Elements.MusicPlayer.paused || Elements.MusicPlayer.ended) {
                    Elements.MusicPlayer.play().then(_ => { _isPlaying = true }).catch(err => { });
                } else {
                    Elements.MusicPlayer.pause();
                }
            }
        },
            newSVG('svg', {
                viewBox: "0 0 24 24"
            },
                newSVG('path', {
                    d: _isPlaying === false ? "M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" : "M14,19H18V5H14M6,19H10V5H6V19Z",
                })
            )
        );
    const NextButton =
        newElem('button', {
            class: 'ripple_effect',
            id: 'NextButton',
            onclick: function () {
                let Active = (Number(localStorage.getItem('Default')) || 0) + 1;
                if (Active === _Length) {
                    Active = 0;
                }
                // @ts-ignore
                document.querySelectorAll('.sidebar_item')[Active].click();
            }
        },
            newSVG('svg', {
                viewBox: "0 0 24 24"
            },
                newSVG('path', {
                    d: "M6,18L14.5,12L6,6M8,9.86L11.03,12L8,14.14M16,6H18V18H16"
                })
            )
        );
    const InfoButton =
        newElem('button', {
            class: 'ripple_effect',
            id: 'InfoButton',
            onclick: function () {
                Elements.rootApp.querySelector('#Time_Matters').animate([{
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
            newSVG('svg', {
                viewBox: "0 0 24 24"
            },
                newSVG('path', {
                    d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
                })
            )
        );
    const Info_Container =
        newElem('div', { class: 'info_container', id: 'Time_Matters' },
            newElem('div', {
                class: 'info_texts'
            },
                newElem('span', {
                    class: 'info_icon'
                },
                    newSVG('svg', {
                        viewBox: '0 0 24 24'
                    },
                        newSVG('path', {
                            d: 'M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z'
                        })
                    )
                ),
                newElem('span', { class: 'texts_text' }, 'Info...'),
                newElem('span', {
                    class: 'info_icon ripple_effect',
                    id: 'Close_Info',
                    onclick: function () {
                        Elements.rootApp.querySelector('#Time_Matters').animate([{
                            transform: 'scaleY(1)',
                            opacity: 1
                        }, {
                            transform: 'scaleY(0)',
                            opacity: 0
                        }], {
                            duration: 225,
                            easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
                            fill: 'forwards'
                        })
                    }
                },
                    newSVG('svg', {
                        viewBox: '0 0 24 24'
                    },
                        newSVG('path', {
                            d: 'M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z'
                        })
                    )
                )
            ),
            newElem('div', {
                class: "info_body"
            },
                newElem('img', {
                    src: _Music.Image,
                    style: {
                        borderRadius: '16px',
                        marginBottom: "8px"
                    }
                }),
                newElem('div', { id: 'Info_Title' }, `Song: ${_Music.Title}`),
                newElem('div', { id: 'Info_Artist' }, `Artist: ${_Music.Artist}`),
                newElem('div', {
                    id: 'Info_Album',
                    style: {
                        marginBottom: "4px"
                    }
                }, `Album: ${_Music.Album}`),
                newElem('div', { id: 'Info_Released' }, `Released: ${_Music.Released}`)
            )
        );
    const musicApp = document.createDocumentFragment();
    musicApp.append(
        Header, ThumbnailContainer, BodyContainer, newElem('div', {
            style: {
                padding: "0px 16px",
                marginBottom: "8px"
            }
        }, ProgressBar),
        newElem('div', { class: 'audio_times' }, currentTime, durationTime),
        newElem('div', { class: 'controls_container' }, RepeatButton, PreviousButton, PlayPauseButton, NextButton, InfoButton),
        Info_Container
    );
    return new Promise((resolve) => {
        Elements.MusicPlayer.setAttribute("src", _Music._src);
        Elements.MusicPlayer.addEventListener('loadedmetadata', function () {
            currentTime.innerHTML = `${reconvert(Elements.MusicPlayer.currentTime)}`;
            durationTime.innerHTML = `${reconvert(Elements.MusicPlayer.duration)}`;
            document.querySelector('.logs_fetching').innerHTML = ``;
            document.querySelectorAll('.sidebar_item')[index].classList.add('isActive');
            NewMetaData(_Music, PreviousButton, NextButton);
            resolve(musicApp);
        });
    });
}

/**
 * @param {MouseEvent | TouchEvent} e
 * @param {HTMLElement} ProgressBar
 * @param {HTMLElement} progressAmount
 * @param {HTMLElement} progressIndicator
 * @param {HTMLElement} currentTime
 */
function Seeking(e, ProgressBar, progressAmount, progressIndicator, currentTime) {
    if (!Elements.MusicPlayer.duration) return;
    console.log(e.type);
    let Mouse_TouchX;
    if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel') {
        // @ts-ignore
        const evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
        for (let index = 0; index < evt.touches.length; index++) {
            const Touch = evt.touches[index] || evt.changedTouches[index];
            Mouse_TouchX = Touch.clientX;
        }
    } else if (e.type == 'mousemove' || e.type == 'mousedown' || e.type == 'mouseup') {
        // @ts-ignore
        Mouse_TouchX = e.clientX;
    }
    if (Mouse_TouchX) {
        let percentage;
        const position = Mouse_TouchX - _OffSetLeft;
        percentage = (100 * position) / ProgressBar.offsetWidth;
        if (percentage >= 100) {
            percentage = 100;
        }
        if (percentage < 0) {
            percentage = 0;
        }
        progressAmount.style.width = `${percentage}%`;
        progressIndicator.style.left = `${percentage}%`;
        const seeked = Number(Elements.MusicPlayer.duration * (percentage / 100));
        if (seeked <= Elements.MusicPlayer.duration) {
            currentTime.innerHTML = `${reconvert(Number(seeked.toFixed(0)))}`;
            Elements.MusicPlayer.currentTime = seeked;
        }
    }
};

(async () => {
    try {
        Elements.AsideBar.append(AsideApp());
        /** @type {number} - 0 to `MusicList.length` */
        const Active = Number(localStorage.getItem('Default')) || 0;
        Elements.rootApp.append(await rootApp(MetaData, Active));
    } catch (error) {
        Elements.rootApp.append(error);
    };
})().then(() => {
    const MediaPlayer = {
        /** @type {HTMLImageElement} */
        ThumbnailImage: document.querySelector('#Song_Thumbnail > img'),
        /** @type {HTMLElement} */
        Song_Title: document.querySelector('#Song_Title'),
        /** @type {HTMLElement} */
        Song_Album: document.querySelector('#Song_Album'),
        /** @type {HTMLElement} */
        currentTime: document.querySelector('.currentTime'),
        /** @type {HTMLElement} */
        durationTime: document.querySelector('.durationTime'),
        /** @type {HTMLImageElement} */
        __Image: document.querySelector('#Time_Matters > .info_body > img'),
        /** @type {HTMLElement} */
        __Info_Title: document.querySelector('#Time_Matters > .info_body > #Info_Title'),
        /** @type {HTMLElement} */
        __Info_Artist: document.querySelector('#Time_Matters > .info_body > #Info_Artist'),
        /** @type {HTMLElement} */
        __Info_Album: document.querySelector('#Time_Matters > .info_body > #Info_Album'),
        /** @type {HTMLElement} */
        ProgressBar: document.querySelector('.progress_bar'),
        /** @type {HTMLElement} */
        progressAmount: document.querySelector('.progress_bar > .progress_list > .progress_amount'),
        /** @type {HTMLElement} */
        progressIndicator: document.querySelector('.progress_bar > .progress_list > .progress_indicator'),
    }
    Array.from(MetaData).forEach(async ({ Name, Artist, Album, Released, Image, _src }, index) => {
        const NewMusic = new Audio(_src);
        document.querySelector('.logs_fetching').innerHTML = `<svg viewBox="0 0 24 24" class="fetching" xmlns="http://www.w3.org/2000/svg"><path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/></svg>Fetching...`;
        NewMusic.addEventListener('loadedmetadata', () => {
            document.querySelectorAll('.sidebar_item')[index].querySelector('.sidebar_info').innerHTML = reconvert(NewMusic.duration);
            document.querySelector('.logs_fetching').innerHTML = ``;
        });
    });
    [].forEach.call(Array.from(document.querySelectorAll('.sidebar_item')), function (elem, index) {
        elem.addEventListener('click', async function () {
            if (elem.classList.contains('isActive')) return;
            await FetchMusic(MetaData, index, ({ Player, Title, Artist, Album, Released, Image, _src }, error) => {
                if (error) return "";
                document.querySelector('aside.sidebar').classList.remove('isOpen');
                document.querySelector('#isOverLay') ? document.querySelector('#isOverLay').remove() : null;
                Array.from(document.querySelectorAll('.sidebar_item')).forEach(element => {
                    if (element.classList.contains('isActive'))
                        element.classList.remove('isActive');
                });
                elem.classList.add('isActive');
                localStorage.setItem('Default', `${index}`);
                MediaPlayer.ThumbnailImage.src = Image;
                MediaPlayer.__Image.src = Image;
                MediaPlayer.Song_Title.textContent = Title;
                MediaPlayer.__Info_Title.textContent = `Title: ${Title}`;
                MediaPlayer.__Info_Artist.textContent = `Artist: ${Artist}`;
                MediaPlayer.Song_Album.textContent = Album;
                MediaPlayer.__Info_Album.textContent = `Album: ${Album}`;
                MediaPlayer.currentTime.innerHTML = `${reconvert(Player.currentTime)}`;
                MediaPlayer.durationTime.innerHTML = `${reconvert(Player.duration)}`;
                MediaPlayer.progressAmount.removeAttribute('style');
                MediaPlayer.progressIndicator.removeAttribute('style');
                _isPlaying && Elements.MusicPlayer.play().then(_ => NewMetaData({ Title, Artist, Album, Image }, document.querySelector('button#PreviousButton'), document.querySelector('button#NextButton'))).catch(() => _isPlaying = false);
            });
        });
    });
    function PLAY_PAUSE_UPDATE() {
        /** @type {SVGPathElement} */
        const svgPath = document.querySelector('#PlayPauseButton > svg > path');
        if (!Elements.MusicPlayer.paused) {
            svgPath.setAttributeNS(null, 'd', "M14,19H18V5H14M6,19H10V5H6V19Z");
            navigator.mediaSession.playbackState = 'playing';
        } else if (Elements.MusicPlayer.ended) {
            if (Elements.MusicPlayer.loop === false) {
                const _Loop = document.body.matches('[loop]');
                const Active = (Number(localStorage.getItem('Default')) || 0) + 1;
                if (!_Loop && Active === _Length) {
                    navigator.mediaSession.playbackState = 'paused';
                    svgPath.setAttributeNS(null, 'd', "M12 5V2.21c0-.45-.54-.67-.85-.35l-3.8 3.79c-.2.2-.2.51 0 .71l3.79 3.79c.32.31.86.09.86-.36V7c3.73 0 6.68 3.42 5.86 7.29-.47 2.27-2.31 4.1-4.57 4.57-3.57.75-6.75-1.7-7.23-5.01-.07-.48-.49-.85-.98-.85-.6 0-1.08.53-1 1.13.62 4.39 4.8 7.64 9.53 6.72 3.12-.61 5.63-3.12 6.24-6.24C20.84 9.48 16.94 5 12 5z");
                } else {
                    /** @type {HTMLElement} */
                    const NextButton = document.querySelector('button#NextButton');
                    NextButton.click();
                }
            }
        } else {
            navigator.mediaSession.playbackState = 'paused';
            svgPath.setAttributeNS(null, 'd', "M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z")
        }
    };
    Elements.MusicPlayer.addEventListener('play', PLAY_PAUSE_UPDATE);
    Elements.MusicPlayer.addEventListener('pause', PLAY_PAUSE_UPDATE);
    Elements.MusicPlayer.addEventListener('ended', PLAY_PAUSE_UPDATE);
    Elements.MusicPlayer.addEventListener('timeupdate', () => {
        const current = Elements.MusicPlayer.currentTime;
        const duration = Elements.MusicPlayer.duration;
        const Percentage = Number((current / duration) * 100);
        if (!ProgressDrag && duration > 0) {
            MediaPlayer.progressAmount.style.width = `${(Percentage)}%`;
            MediaPlayer.progressIndicator.style.left = `${(Percentage)}%`;
            MediaPlayer.currentTime.innerHTML = `${reconvert(Number(Elements.MusicPlayer.currentTime.toFixed(0)))}`;
        }
    });


    // For ProgressBar
    document.addEventListener('mousedown', (event) => {
        if (event.target === MediaPlayer.ProgressBar) {
            ProgressDrag = true;
            Seeking(event, MediaPlayer.ProgressBar, MediaPlayer.progressAmount, MediaPlayer.progressIndicator, MediaPlayer.currentTime);
        }
    });
    document.addEventListener("touchstart", function (event) {
        if (event.target === MediaPlayer.ProgressBar) {
            ProgressDrag = true;
            Seeking(event, MediaPlayer.ProgressBar, MediaPlayer.progressAmount, MediaPlayer.progressIndicator, MediaPlayer.currentTime);
        }
    });
    document.addEventListener('mousemove', function (event) {
        ProgressDrag && Seeking(event, MediaPlayer.ProgressBar, MediaPlayer.progressAmount, MediaPlayer.progressIndicator, MediaPlayer.currentTime);
    });
    document.addEventListener('touchmove', function (event) {
        ProgressDrag && Seeking(event, MediaPlayer.ProgressBar, MediaPlayer.progressAmount, MediaPlayer.progressIndicator, MediaPlayer.currentTime);
    });
    document.addEventListener('mouseup', function (event) {
        if (ProgressDrag) {
            ProgressDrag = false;
            Seeking(event, MediaPlayer.ProgressBar, MediaPlayer.progressAmount, MediaPlayer.progressIndicator, MediaPlayer.currentTime);
        }
    });
    document.addEventListener('touchend', function (event) {
        if (ProgressDrag) {
            ProgressDrag = false;
            Seeking(event, MediaPlayer.ProgressBar, MediaPlayer.progressAmount, MediaPlayer.progressIndicator, MediaPlayer.currentTime);
        }
    });

}).then(() => {
    ripple();
});
Array.from(["load", "resize"]).forEach((_event) => {
    window.addEventListener(_event, () => {
        if (document.body.clientWidth < 634) {
            document.body.classList.add('isMobile');
        } else {
            document.body.classList.remove('isMobile');
            document.querySelector('aside.sidebar').classList.remove('isOpen');
            document.querySelector('#isOverLay') ? document.querySelector('#isOverLay').remove() : null;
        }
    });
});