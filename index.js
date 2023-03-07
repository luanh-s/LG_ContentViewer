window.onload = function() {
    var bridge = new WebOSServiceBridge();
    /*
     *  getTimeApi calls gettime of systemservice, a module in the platform.
     */
    var getTimeApi = 'luna://com.webos.service.systemservice/clock/getTime';
    var getTimeParams = '{}';

    /*
     *  helloApi calls the hello method of js_service template provided by CLI.
     *  In this case, the service name is used as default name "com.domain.app.service" is.
     *  If you change this service name, you need to change the service name of the following API.
     *
     *  If you change the name to helloParmas as you want, the contents will be reflected on the screen.
     */
    var helloApi = 'luna://com.domain.app.service/hello';
    var helloParams = '{"name":"webOS"}';

    function getTime_callback(msg){
        var arg = JSON.parse(msg);
        if (arg.returnValue) {
            console.log("[APP_NAME: example web app] GETTIME_SUCCESS UTC : " + arg.utc);
            //webOSSystem.PmLogString(6, "GETTIME_SUCCESS", '{"APP_NAME": "example web app"}', "UTC : " + arg.utc);
        }
        else {
            console.error("[APP_NAME: example web app] GETTIME_FAILED errorText : " + arg.errorText);
            //webOSSystem.PmLogString(3, "GETTIME_FAILED", '{"APP_NAME": "example web app"}', "errorText : " + arg.errorText);
        }
    }

    function hello_callback(msg){
        var arg = JSON.parse(msg);
        if (arg.returnValue) {
            document.getElementById("txt_msg").innerHTML = arg.Response;
            console.log("[APP_NAME: example web app] CALLHELLO_SUCCESS response : " + arg.Response);
            //webOSSystem.PmLogString(6, "CALLHELLO_SUCCESS", '{"APP_NAME": "example web app"}', "response : " + arg.Response);
        }
        else {
            console.error("[APP_NAME: example web app] CALLHELLO_FAILED errorText : " + arg.errorText);
            //webOSSystem.PmLogString(3, "CALLHELLO_FAILED", '{"APP_NAME": "example web app"}', "errorText : " + arg.errorText);
        }
    }

    bridge.onservicecallback = getTime_callback;
    bridge.call(getTimeApi, getTimeParams);

    document.getElementById("txt_msg").onclick = function() {
        bridge.onservicecallback = hello_callback;
        bridge.call(helloApi, helloParams);
    };

    inicializaApp();
}



function exibeEpisodes(titleShown){
    let tituloFiltrado = titulosSeries.filter(titulo => titulo.id == titleShown)[0];

    let episodesContainer = document.querySelector('.episodesContainer');
    episodesContainer.innerHTML = ``;
    tituloFiltrado.episodes.forEach(episodio => {
        criarEpisodio(episodesContainer, episodio);
    })
    let voidItens = `
        <div class="voiditem"></div>
        <div class="voiditem"></div>
        <div class="voiditem"></div>
        <div class="voiditem"></div>
    `;
    episodesContainer.insertAdjacentHTML('beforeend', voidItens);

    let onlyList = document.querySelector('.onlyList');
    onlyList.classList.add(`showEpisodes`);
    onlyList.classList.add(`${titleShown}`);
}
function fechaEpisodes(){
    document.querySelector('.onlyList').classList.remove('showEpisodes');
}

let currentCard = null;
function exibeVideo(event){
    let itemCard = event.target.closest('.item');
    exibeVideoCard(itemCard);
}
function exibeVideoCard(itemCard){
    let videoShown = itemCard.getAttribute('data-link');
    document.querySelector('video').setAttribute('src', `https://contviewer.s3.sa-east-1.amazonaws.com/Shingeki+no+Kyojin/AoTDublado${videoShown}.mp4`);
    document.querySelector('video').setAttribute('id', videoShown);
    document.querySelector('.videoText').innerText = videoShown;
    document.querySelector('.onlyList').classList.add('showVideo');
    limpaSelected();
    itemCard.classList.add('currentlyOpen');
    currentCard = itemCard;
}
function fechaVideo(){
    document.querySelector('video').setAttribute('src', '');
    let idVideo = document.querySelector('video').getAttribute('id');
    document.querySelector('.onlyList').classList.remove('showVideo');
    document.querySelector('video').classList.remove(idVideo);
}
function anteriorVideo(){
    let itemCard = currentCard.previousElementSibling;
    if (itemCard != null) {
        limpaSelected();
        itemCard.classList.add('currentlyOpen');
        exibeVideoCard(itemCard);
    } else {
        alert('Primeiro Video Aberto');
    }
}
function proximoVideo(){
    let itemCard = currentCard.nextElementSibling;
    if (itemCard != null) {
        limpaSelected();
        itemCard.classList.add('currentlyOpen');
        exibeVideoCard(itemCard);
    } else {
        alert('Último Video Aberto');
    }
}

function limpaSelected() {
    document.querySelectorAll('.currentlyOpen').forEach(item => {
        item.classList.remove('currentlyOpen');
    })
}


let titulosSeries = [
    {
        title: 'Shingeki no Kyojin',
        subtitle: 'Season 1',
        id: 'SHINGEKI_S01',
        imageLink: 'https://static.wikia.nocookie.net/shingekinokyojin/images/d/d8/Attack_on_Titan_Season_1.jpg/revision/latest?cb=20211005182832',
        episodes: [
            { dataLink: '01x01', firstText: 'Shingeki', secondText: 'S01 E01', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x02', firstText: 'Shingeki', secondText: 'S01 E02', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x03', firstText: 'Shingeki', secondText: 'S01 E03', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x04', firstText: 'Shingeki', secondText: 'S01 E04', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x05', firstText: 'Shingeki', secondText: 'S01 E05', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x06', firstText: 'Shingeki', secondText: 'S01 E06', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x07', firstText: 'Shingeki', secondText: 'S01 E07', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x08', firstText: 'Shingeki', secondText: 'S01 E08', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x09', firstText: 'Shingeki', secondText: 'S01 E09', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x10', firstText: 'Shingeki', secondText: 'S01 E10', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x11', firstText: 'Shingeki', secondText: 'S01 E11', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x12', firstText: 'Shingeki', secondText: 'S01 E12', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x13', firstText: 'Shingeki', secondText: 'S01 E13', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x14', firstText: 'Shingeki', secondText: 'S01 E14', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x15', firstText: 'Shingeki', secondText: 'S01 E15', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x16', firstText: 'Shingeki', secondText: 'S01 E16', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x17', firstText: 'Shingeki', secondText: 'S01 E17', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x18', firstText: 'Shingeki', secondText: 'S01 E18', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x19', firstText: 'Shingeki', secondText: 'S01 E19', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x20', firstText: 'Shingeki', secondText: 'S01 E20', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x21', firstText: 'Shingeki', secondText: 'S01 E21', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x22', firstText: 'Shingeki', secondText: 'S01 E22', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x23', firstText: 'Shingeki', secondText: 'S01 E23', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x24', firstText: 'Shingeki', secondText: 'S01 E24', watched: false, lastTimeStamp: '0'},
            { dataLink: '01x25', firstText: 'Shingeki', secondText: 'S01 E25', watched: false, lastTimeStamp: '0'},
        ]
    },
    {
        title: 'Shingeki no Kyojin',
        subtitle: 'Season 2',
        id: 'SHINGEKI_S02',
        imageLink: 'https://i1.sndcdn.com/artworks-000215987721-5cpijy-t500x500.jpg',
        episodes: [
            { dataLink: '02x01', firstText: 'Shingeki', secondText: 'S02 E01', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x02', firstText: 'Shingeki', secondText: 'S02 E02', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x03', firstText: 'Shingeki', secondText: 'S02 E03', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x04', firstText: 'Shingeki', secondText: 'S02 E04', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x05', firstText: 'Shingeki', secondText: 'S02 E05', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x06', firstText: 'Shingeki', secondText: 'S02 E06', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x07', firstText: 'Shingeki', secondText: 'S02 E07', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x08', firstText: 'Shingeki', secondText: 'S02 E08', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x09', firstText: 'Shingeki', secondText: 'S02 E09', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x10', firstText: 'Shingeki', secondText: 'S02 E10', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x11', firstText: 'Shingeki', secondText: 'S02 E11', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x12', firstText: 'Shingeki', secondText: 'S02 E12', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x13', firstText: 'Shingeki', secondText: 'S02 E13', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x14', firstText: 'Shingeki', secondText: 'S02 E14', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x15', firstText: 'Shingeki', secondText: 'S02 E15', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x16', firstText: 'Shingeki', secondText: 'S02 E16', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x17', firstText: 'Shingeki', secondText: 'S02 E17', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x18', firstText: 'Shingeki', secondText: 'S02 E18', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x19', firstText: 'Shingeki', secondText: 'S02 E19', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x20', firstText: 'Shingeki', secondText: 'S02 E20', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x21', firstText: 'Shingeki', secondText: 'S02 E21', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x22', firstText: 'Shingeki', secondText: 'S02 E22', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x23', firstText: 'Shingeki', secondText: 'S02 E23', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x24', firstText: 'Shingeki', secondText: 'S02 E24', watched: false, lastTimeStamp: '0'},
            { dataLink: '02x25', firstText: 'Shingeki', secondText: 'S02 E25', watched: false, lastTimeStamp: '0'},
        ]
    },
    {
        title: 'Shingeki no Kyojin',
        subtitle: 'Season 3',
        id: 'SHINGEKI_S03',
        imageLink: 'https://m.media-amazon.com/images/I/817nGTgaEBL.jpg',
        episodes: [
            { dataLink: '03x01', firstText: 'Shingeki', secondText: 'S03 E01', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x02', firstText: 'Shingeki', secondText: 'S03 E02', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x03', firstText: 'Shingeki', secondText: 'S03 E03', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x04', firstText: 'Shingeki', secondText: 'S03 E04', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x05', firstText: 'Shingeki', secondText: 'S03 E05', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x06', firstText: 'Shingeki', secondText: 'S03 E06', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x07', firstText: 'Shingeki', secondText: 'S03 E07', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x08', firstText: 'Shingeki', secondText: 'S03 E08', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x09', firstText: 'Shingeki', secondText: 'S03 E09', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x10', firstText: 'Shingeki', secondText: 'S03 E10', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x11', firstText: 'Shingeki', secondText: 'S03 E11', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x12', firstText: 'Shingeki', secondText: 'S03 E12', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x13', firstText: 'Shingeki', secondText: 'S03 E13', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x14', firstText: 'Shingeki', secondText: 'S03 E14', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x15', firstText: 'Shingeki', secondText: 'S03 E15', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x16', firstText: 'Shingeki', secondText: 'S03 E16', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x17', firstText: 'Shingeki', secondText: 'S03 E17', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x18', firstText: 'Shingeki', secondText: 'S03 E18', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x19', firstText: 'Shingeki', secondText: 'S03 E19', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x20', firstText: 'Shingeki', secondText: 'S03 E20', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x21', firstText: 'Shingeki', secondText: 'S03 E21', watched: false, lastTimeStamp: '0'},
            { dataLink: '03x22', firstText: 'Shingeki', secondText: 'S03 E22', watched: false, lastTimeStamp: '0'},
        ]
    },
];











function inicializaApp() {
    let itensContainer = document.querySelector('.itensContainer');
    titulosSeries.forEach(titulo => {
        criarTitulo(itensContainer, titulo);
    })
}

function criarTitulo(destino, titulo){
    createCardTitle(destino, titulo, 'beforeend');
    // titulo.episodes.forEach(episodio => {
    //     criarEpisodio(destino, episodio);
    // })
}

function criarEpisodio(destino, episodio){
    createCardEpisode(destino, episodio, 'beforeend');

    // titulo.episodes.forEach(episodio => {
    //     criarEpisodio(episodio);
    // })
}

function createCardTitle(destino, params, where) {
    let card = 
    `<div class="item" data-link="${params.id}" onclick="exibeEpisodes('${params.id}');">
        <div class="imagem">
            <img src="${params.imageLink}" alt="" srcset="">
        </div>
        <div class="titulo">${params.title}<br>${params.subtitle}</div>
    </div>`;

    destino.insertAdjacentHTML(where, card)
}
function createCardEpisode(destino, params, where) {
    let card = 
    `<div class="item" data-link="${params.dataLink}" onclick="exibeVideo(event);">
        <div class="titulo">${params.firstText}<br>${params.secondText}</div>
    </div>`;

    destino.insertAdjacentHTML(where, card)
}