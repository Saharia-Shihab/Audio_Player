/**
 * @param {String} _id
 * @returns {String} - `URL` of the thumbnail of the song...
 */
function img(_id) {
    return `https://i1.ytimg.com/vi/${_id}/maxresdefault.jpg`
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
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941342696394612836/y2mate.com_-_imran_khan_Aaja_We_Mahiya_mp3_www_mixflix_net.mp3'
    }, {
        Name: "Pata Chalgea",
        Artist: "Imran Khan",
        Album: "Unforgettable (Urban Punjabi Ringtones)",
        Released: 2008,
        Image: img('JOX09U8noOE'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941343802285768764/y2mate.com_-_Imran_Khan_Pata_Chalgea_UnOfficial_Video.mp3'
    }, {
        Name: "Excuses",
        Artist: "AP Dhillon",
        Album: "Best",
        Released: 2020,
        Image: img('vX2cDW8LUWk'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941362207055290368/y2mate.com_-_Excuses_AP_Dhillon_Gurinder_Gill_Intense.mp3'
    }, {
        Name: "Toxic",
        Artist: "BoyWithUke",
        Album: "Faded",
        Released: 2021,
        Image: img('-_qIg-lOyZ8'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941361486863945738/y2mate.com_-_BoyWithUke_Toxic_Official_Lyric_Video.mp3'
    }, {
        Name: "Enemy",
        Artist: "Imagine Dragons, JID",
        Album: "Arcane League of Legends (Soundtrack from the Animated Series)",
        Released: 2021,
        Image: img('D9G1VOjN_84'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941363502235418674/y2mate.com_-_Imagine_Dragons_JID_Enemy_from_the_series_Arcane_League_of_Legends_Official_Music_Video.mp3'
    }, {
        Name: "детство",
        Artist: "Rauf & Faik",
        Album: "Я люблю тебя",
        Released: 2018,
        Image: img('m-el0pQLQE4'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941399977907863592/y2mate.com_-_Rauf_Faik__Official_video.mp3'
    }, {
        Name: "Kya Mujhe Pyaar Hai",
        Artist: "KK",
        Album: "Woh Lamhe | Movie",
        Released: 2006,
        Image: img('lrAM_H7v8wM'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941712522883506197/y2mate.com_-_Full_Video_Kya_Mujhe_Pyaar_Hai_Woh_Lamhe_Shiny_Ahuja_Kangna_Ranaut_KK_Pritam.mp3'
    }, {
        Name: "Likhe Jo Khat Tujhe",
        Artist: "Sanam",
        Album: "Sanam - Likhe Jo Khat Tujhe",
        Released: 2020,
        Image: img('3wGLsjgTx4c'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941717035530985523/y2mate.com_-_Likhe_Jo_Khat_Tujhe_Sanam.mp3'
    }, {
        Name: "Insane",
        Artist: "AP Dhillon",
        Album: "Best",
        Released: 2022,
        Image: img('cqP8I5aaud8'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941718935231926322/y2mate.com_-_INSANE_AP_DHILLON_GURINDER_GILL_SHINDA_KAHLON_GMINXR.mp3'
    }, {
        Name: "Brown Rang",
        Artist: "Yo Yo Honey Singh",
        Album: "International Villager",
        Released: 2012,
        Image: img('PqFMFVcCZgI'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941724017218437180/y2mate.com_-_Brown_Rang_Yo_Yo_Honey_Singh_Indias_No1_Video_2012.mp3'
    }, {
        Name: "Let Me Down Slowly x Main Dhoondne Ko Zamaane Mein",
        Artist: "Arijit Singh || Alec Benjamin",
        Album: "HEARTLESS || Let Me Down Slowly",
        Released: 2021,
        Image: img('s-bZD3O3P80'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941722918583427142/y2mate.com_-_Let_Me_Down_Slowly_x_Main_Dhoondne_Ko_Zamaane_Mein_Gravero_Mashup_Full_Version.mp3'
    }, {
        Name: "Sochta Hun Ke Wo Kitne Masoom The",
        Artist: "Nusrat Fateh Ali Khan",
        Album: "Allah Ditta Hall UK Concert 1985, Vol. 144",
        Released: 1985,
        Image: img('rtDw-_1Gh0Q'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/941727092243054602/y2mate.com_-_Sochta_Houn_Remix_Dekhte_Ustad_Nusrat_Fateh_Ali_Khan_A1_MelodyMaster_OSA_Official_HD_Video.mp3'
    }, {
        Name: "Laaree Chootee ft. Tejas R.H",
        Artist: "WORMONO",
        Album: "Laaree Chootee",
        Released: 2021,
        Image: img('Ub-LX8S__GA'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/942273692245852160/y2mate.com_-_Laaree_Chootee_Call_WORMONO_feat_Tejas_RH_Lofi_Remake_Bollywood_Lofi.mp3'
    }, {
        Name: "Amar Dehokhan",
        Artist: "Odd Signature",
        Album: "!",
        Released: 2020,
        Image: img('OUu19JIk-_k'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/942489332973994004/Amar_Dehokhan_-_Odd_Signature_Official256k.mp3'
    }, {
        Name: "Ami Akash Pathabo",
        Artist: "AvoidRafa",
        Album: "!",
        Released: 2015,
        Image: img('E7z9h2oKrRs'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/942489377110642738/Ami_Akash_Pathabo___AvoidRafa___Banglalink_present_s_Legends_of_Rock128k.mp3'
    }, {
        Name: "Moho",
        Artist: "Aftermath",
        Album: "Moho",
        Released: 2019,
        Image: img('9gIFPafF0rs'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/942489867282157578/AFTERMATH_l_MOHO_Bangla_lyrics128k.mp3'
    }, {
        Name: "Amaro Porano Jaha Chay",
        Artist: "Rahul Dutta",
        Album: "!",
        Released: 2021,
        Image: img('8uuRHmtCaEw'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/942489951092748358/Amaro_Porano_Jaha_Chay___Rahul_Dutta___Atishay___Suraj___Rohan___Rabindra_Sangeet128k.mp3'
    }, {
        Name: "Tomar jonno",
        Artist: "Shayan Chowdhury Arnob",
        Album: "Hok Kolorob",
        Released: 2006,
        Image: img('xDZy-lWBVkQ'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/942490094277890128/Arnob-_tomar_jonno256k.mp3'
    }, {
        Name: "Epitaph",
        Artist: "Aurthohin",
        Album: "Shopnochura-1",
        Released: 2017,
        Image: img('ezAtfMxqUWQ'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/942490191694794772/Aurthohin_-_Epitaph_Lyrics256k.mp3'
    }, {
        Name: "Shada",
        Artist: "Minar Rahman",
        Album: "!",
        Released: 2017,
        Image: img('F9Dl-1V4NYc'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/942490250595414047/Bangla_Video_Songs_Shada_-_Minar128k.mp3'
    }, {
        Name: "Bedona",
        Artist: "Shunno",
        Album: "Notun Srot",
        Released: 2008,
        Image: img('qQrvEpGzRvA'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/942490328055808010/Bedona_by_Shunno256k.mp3'
    }, {
        Name: "Benche Thakar Gaan",
        Artist: "Anupam Roy",
        Album: "!",
        Released: 2020,
        Image: img('ep52mT-w_TI'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/942490402198519808/Benche_Thakar_Gaan__E0A6ACE0A787E0A681E0A69AE0A787_E0A6A5E0A6BEE0A695E0A6BEE0A6B0_E0A697E0A6BEE0A6A8____Lyrical___Autograph___Prosenjit___Rupam_Islam___Srijit128k.mp3'
    }, {
        Name: "Bhenge Porona Ebhabe",
        Artist: "Pritom Hasan",
        Album: "Bhenge Porona Ebhabe",
        Released: 2020,
        Image: img('jFEQhZHyYUQ'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/942490485157658734/Bhenge_Porona_Ebhabe__E0A6ADE0A787E0A699E0A787_E0A6AAE0A6A1E0A6BCE0A78BE0A6A8E0A6BE_E0A68FE0A6ADE0A6BEE0A6ACE0A787__Lofi_Remix____Song_Lyrics____Pritom128k.mp3'
    }, {
        Name: "December'er Shohorey",
        Artist: "Sourav Saha",
        Album: "December'er Shohorey",
        Released: 2015,
        Image: img('Ly7Z0ljOBd4'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/942490746584453241/December_er_Shohorey____With_Love2C_Calcutta_OST256k.mp3'
    }, {
        Name: "Dekhechi Rupsagore",
        Artist: "Anirban Sikdar",
        Album: "Dekhechi Ruosagore",
        Released: 2019,
        Image: img('kPlaAJRW7b8'),
        _src: 'https://cdn.discordapp.com/attachments/941340630792171540/942490793535471636/Dekhechi_Rupsagore___E0A6A6E0A787E0A696E0A787E0A69BE0A6BF_E0A6B0E0A782E0A6AAE0A6B8E0A6BEE0A697E0A6B0E0A787___Anirban_Sikdar___Nabani_Das_Khyepa_Baul___Bangla_Folk_Song128k.mp3'
    }
].sort(function (a, b) {
    if (a.Name < b.Name) { return -1; }
    if (a.Name > b.Name) { return 1; }
    return 0;
});