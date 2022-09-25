
const mainLabel = document.querySelector('main');
//*selecciona los 4 enlaces de navbar al estar colocados en el html no es necesario dentro de la F
const links = document.querySelectorAll('nav ul li a');
//*comienza el js con el hash de home
getTemplates();

async function getTemplates(){
    //*cargar al inicio home(slider&cards)
    let id = getIdFromHash();
    const url = getUrlFromId(id);

    //*require url y callback con la ubicacion para innerHTML
    loadAjaxResponseToElement(url, response => {
        mainLabel.innerHTML = response;
    });

    const jsFile = await loadJS(id);
    const script = document.createElement('script');
    script.id = `${id}script`;
    script.innerHTML = await jsFile.text();
    console.log(script);
    document.body.appendChild(script);

    //*renderiza si hago click en los enlaces
    links.forEach( link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const id = e.target.href.split('#')[1];
            location.hash = id; //*agregar a la ruta #inicio-alta-nosotros...
        })
    })
    //*se activa si se utilizan <a></a> o por enlace
    window.addEventListener('hashchange', e => {
        console.log('hasheeea1');
        const id = location.hash.slice(1); //corta ej #inicio => inicio
        const url = getUrlFromId(id);
        
        loadAjaxResponseToElement(url, response => {
            mainLabel.innerHTML = response;
        })

        refreshJS(id)

    });

}

//*actualiza partes del sitio
function ajaxInit( url, method = 'get' ){
    //actualiza partes del sitio
    const xhr = new XMLHttpRequest();
    xhr.open( method , url );
    xhr.send();
    return xhr;  
}//!OK

//*crea la ruta segun hash=id
function getUrlFromId(id){
    return `templates/${id}.html`
}//!OK DEVUEKVE LA RUTA 

//*devuelve el hash if(home) inicio
function getIdFromHash(){
    return location.hash ? location.hash.slice(1) : 'inicio';
}//!OK DEVUELVE LA RUTA SEGUN HASH

//*renderiza el html
function loadAjaxResponseToElement(url, callbackOnLoad){
    const xhr = ajaxInit( url );//optinene las id de navbar
    xhr.addEventListener('load', e => {
        //devuelve el html clickeado
        if(e.target.status === 200){
            callbackOnLoad(e.target.responseText);
        }
        //else 404
    })
}

//!  -------------------------
async function loadJS(id){
    
    const html = await fetch(`../js/${id}.js`);
    if(html.status === 200)
        return html;
}

async function refreshJS(id){
    console.log(id);
    console.log('hasheeea2');
    const jsFile = await loadJS(id);
    const script = document.createElement('script');

    if(document.getElementById('inicioscript'))
    {
        document.getElementById('inicioscript').remove();
    }

        script.id = `${id.slice(1)}script`;
        script.innerHTML = await jsFile.text();
        document.body.appendChild(script);
    

    
    
    
}

//!  -------------------------


