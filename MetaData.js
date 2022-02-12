/**
 * @param {String} _id
 * @returns {String} - `URL` of the thumbnail of the song...
 */
function img(_id) {
    return `https://i1.ytimg.com/vi/${_id}/sddefault.jpg`
}

/**
 * @param {number} Length
 * @returns {string} - Random generated `You_ID`.
 */
function NewID(Length) {
    let result = 'You_';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let index = 0; index < Length; index++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export default [
    {
        Name: "Aaja We Mahiya",
        Artist: "Imran Khan",
        Album: "Unforgettable (Urban Punjabi Ringtones)",
        Released: 2008,
        Image: img('BJtbYaVwyEI'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941342696394612836/y2mate.com_-_imran_khan_Aaja_We_Mahiya_mp3_www_mixflix_net.mp3',
        _id: NewID(12)
    }, {
        Name: "Pata Chalgea",
        Artist: "Imran Khan",
        Album: "Unforgettable (Urban Punjabi Ringtones)",
        Released: 2008,
        Image: img('JOX09U8noOE'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941343802285768764/y2mate.com_-_Imran_Khan_Pata_Chalgea_UnOfficial_Video.mp3',
        _id: NewID(12)
    }, {
        Name: "Excuses",
        Artist: "AP Dhillon",
        Album: "Best",
        Released: 2020,
        Image: img('vX2cDW8LUWk'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941362207055290368/y2mate.com_-_Excuses_AP_Dhillon_Gurinder_Gill_Intense.mp3',
        _id: NewID(12)
    }, {
        Name: "Toxic",
        Artist: "BoyWithUke",
        Album: "Faded",
        Released: 2021,
        Image: img('-_qIg-lOyZ8'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941361486863945738/y2mate.com_-_BoyWithUke_Toxic_Official_Lyric_Video.mp3',
        _id: NewID(12)
    }, {
        Name: "Enemy",
        Artist: "Imagine Dragons, JID",
        Album: "Arcane League of Legends (Soundtrack from the Animated Series)",
        Released: 2021,
        Image: img('D9G1VOjN_84'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941363502235418674/y2mate.com_-_Imagine_Dragons_JID_Enemy_from_the_series_Arcane_League_of_Legends_Official_Music_Video.mp3',
        _id: NewID(12)
    }, {
        Name: "детство",
        Artist: "Rauf & Faik",
        Album: "Я люблю тебя",
        Released: 2018,
        Image: img('m-el0pQLQE4'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941399977907863592/y2mate.com_-_Rauf_Faik__Official_video.mp3',
        _id: NewID(12)
    }, {
        Name: "Kya Mujhe Pyaar Hai",
        Artist: "KK",
        Album: "Woh Lamhe | Movie",
        Released: 2006,
        Image: img('lrAM_H7v8wM'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941712522883506197/y2mate.com_-_Full_Video_Kya_Mujhe_Pyaar_Hai_Woh_Lamhe_Shiny_Ahuja_Kangna_Ranaut_KK_Pritam.mp3',
        _id: NewID(12)
    }, {
        Name: "Likhe Jo Khat Tujhe",
        Artist: "Sanam",
        Album: "Sanam - Likhe Jo Khat Tujhe",
        Released: 2020,
        Image: img('3wGLsjgTx4c'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941717035530985523/y2mate.com_-_Likhe_Jo_Khat_Tujhe_Sanam.mp3',
        _id: NewID(12)
    }, {
        Name: "Insane",
        Artist: "AP Dhillon",
        Album: "Best",
        Released: 2022,
        Image: img('cqP8I5aaud8'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941718935231926322/y2mate.com_-_INSANE_AP_DHILLON_GURINDER_GILL_SHINDA_KAHLON_GMINXR.mp3',
        _id: NewID(12)
    }, {
        Name: "Brown Rang",
        Artist: "Yo Yo Honey Singh",
        Album: "International Villager",
        Released: 2012,
        Image: img('PqFMFVcCZgI'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941724017218437180/y2mate.com_-_Brown_Rang_Yo_Yo_Honey_Singh_Indias_No1_Video_2012.mp3',
        _id: NewID(12)
    }, {
        Name: "Let Me Down Slowly x Main Dhoondne Ko Zamaane Mein",
        Artist: "Arijit Singh || Alec Benjamin",
        Album: "HEARTLESS || Let Me Down Slowly",
        Released: 2021,
        Image: img('s-bZD3O3P80'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941722918583427142/y2mate.com_-_Let_Me_Down_Slowly_x_Main_Dhoondne_Ko_Zamaane_Mein_Gravero_Mashup_Full_Version.mp3',
        _id: NewID(12)
    }, {
        Name: "Sochta Hun Ke Wo Kitne Masoom The",
        Artist: "Nusrat Fateh Ali Khan",
        Album: "Allah Ditta Hall UK Concert 1985, Vol. 144",
        Released: 1985,
        Image: img('rtDw-_1Gh0Q'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941727092243054602/y2mate.com_-_Sochta_Houn_Remix_Dekhte_Ustad_Nusrat_Fateh_Ali_Khan_A1_MelodyMaster_OSA_Official_HD_Video.mp3',
        _id: NewID(12)
    }
].sort(function (a, b) {
    if (a.Name < b.Name) { return -1; }
    if (a.Name > b.Name) { return 1; }
    return 0;
});