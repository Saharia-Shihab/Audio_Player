import New from './bin/newElem.js';
import Svg from './bin/newSVG.js';
import ripple from './bin/ripple.js';
import App from './App.js';
import MetaData from './MetaData.js';
const _Length = MetaData.length;


const Elements = {
    /** @type {HTMLDivElement} */
    rootApp: document.querySelector('#app'),

    Aside: document.querySelector('aside.sidebar'),
    SidebarContainer: document.querySelector('.sidebar_container'),
    // For Player
    MusicDiv: document.getElementsByTagName('audio')[0],
};
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


const ReadyFunction = async () => {
    try {
        const NewList = document.createDocumentFragment();
        Array.from(MetaData).forEach(({ Name, Artist, Album, Released, Image, _src, _id }, index) => {
            NewList.append(
                New('div', {
                    class: 'sidebar_item ripple_effect',
                    role: 'button',
                    onclick: async function () {
                        if (this.classList.contains('isActive')) return;
                        await App(Elements.MusicDiv, Name, Artist, Album, Released, Image, _src, index)
                            .then(_App => {
                                Elements.rootApp.append(_App);
                                ripple();
                            })
                            .catch(_Err => {
                                Elements.rootApp.append(_Err);
                            });
                    }
                },
                    New('span', {
                        class: 'sidebar_list'
                    }, `${index + 1}`),
                    New('div', {
                        class: 'sidebar_context',
                    },
                        New('span', { class: 'context_primary' }, `${Name}`),
                        New('span', { class: 'context_secondary' }, `By: ${Artist}`),
                    ),
                    New('span', {
                        class: 'sidebar_info'
                    },
                        Svg('svg', {
                            viewBox: '0 0 24 24',
                            height: '24px',
                            width: '24px',
                            class: "fetching"
                        },
                            Svg('path', {
                                'd': 'M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z'
                            })
                        )
                    )
                )
            );
        });

        Elements.SidebarContainer.append(NewList);
    } catch (error) {
        document.body.innerHTML = `${error}`;
    }
}

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

/**
 * @param {string} _src
 */
function Music(_src) {
    const NewMusic = new Audio(_src);
    document.querySelector('.logs_fetching').innerHTML = `<svg viewBox="0 0 24 24" class="fetching" xmlns="http://www.w3.org/2000/svg"><path d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"/></svg>Fetching...`;
    return new Promise((resolve) => {
        NewMusic.addEventListener('loadeddata', () => {
            resolve(reconvert(NewMusic.duration));
        });
    });
};

window.addEventListener('load', () => {
    localStorage.removeItem("_isPlaying");
    ReadyFunction().then((value) => {
        Array.from(MetaData).forEach(async ({ Name, Artist, Album, Released, Image, _src, _id }, index) => {
            const DurPlace = Elements.SidebarContainer.querySelectorAll('.sidebar_item')[index].querySelector('.sidebar_info');
            DurPlace.innerHTML = `${await Music(_src)}`;
        });
    }).finally(() => {
        /** @type {number} - 0 to `MetaData.length` */
        const Active = Number(localStorage.getItem('Default')) || 0;
        // @ts-ignore
        document.querySelectorAll('.sidebar_item')[Active].click();
        ripple();
    });
});