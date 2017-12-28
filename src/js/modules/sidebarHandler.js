function goHome() {
    document.querySelector('.js-sb a.is-active').classList.remove('is-active');
    document.getElementById('js-sb_home').classList.add('is-active');
    document.querySelector('.js-panel:not(.is-hidden)').classList.add('is-hidden');
    document.getElementById('xml-list').classList.remove('is-hidden');
}
function newXml() {
    document.querySelector('.js-sb a.is-active').classList.remove('is-active');
    document.getElementById('js-sb_new-xml').classList.add('is-active');
    document.querySelector('.js-panel:not(.is-hidden)').classList.add('is-hidden');
    document.getElementById('xml-new').classList.remove('is-hidden');
}

function init() {
    document.getElementById('js-sb_home').addEventListener('click', goHome);
    document.getElementById('js-sb_new-xml').addEventListener('click', newXml);
}

export default { init };
