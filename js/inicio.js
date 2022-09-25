
const cartButtonContainer = document.querySelector('.main-header__cart-button-container');//*boton carrito
const cart = document.querySelector('.cart-button__row');
const containerCart = document.querySelector('.cart-button__list tbody');
const emptyCartBtn = document.querySelector('.cart-button__vaciar-carrito');
const main = document.getElementById('main');
let articlesArray = [];
let flag;




//! ----------------------------------CARRITO----------------------------------
//*mostrar ventana carrito
cartButtonContainer.addEventListener('click', e => {
    const botonCarrito = e.target.parentElement;
    if(flag==0){
        flag=1;
        botonCarrito.querySelector('.cart-button__row').style.display = "none";
    }else{
        botonCarrito.querySelector('.cart-button__row').style.display = "block";
        flag=0;
    }
    
})
//*eventos del carro

//*agregar al carrito
main.addEventListener('click', addArticle);
//*remover art
cart.addEventListener('click', removeArticle);
//*vaciar carrito
emptyCartBtn.addEventListener('click', () => {
    articlesArray= [];
    cleanHTML();
})

//*eliminar un articulo del carrito
function removeArticle(e){
    if(e.target.classList.contains('cart-button__delete-article')){
        const articuloId = e.target.getAttribute('data-id');

        articlesArray = articlesArray.filter( articulo => articulo.id !== articuloId);
        //*actualiza html de carrito
        cartHTML();
    }
}
//*agrega al carrito
function addArticle(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        //*selecciona el <article></article>
        const selectedArticle = e.target.parentElement.parentElement.parentElement;
        readArticleData(selectedArticle);
    }
}
function readArticleData(articulo){
    //*datos del art seleccionado
    const infoArticle = {
        imagen: articulo.querySelector('img').src,
        titulo: articulo.querySelector('.card__heading').textContent,
        precio: articulo.querySelector('.card__price-final').textContent,
        id:     articulo.querySelector('a').getAttribute('data-id'),
        cantidad:1
    };
    
    //*si el articulo existe art++
    const existe = articlesArray.some( articulo => articulo.id === infoArticle.id )
    if(existe){
        //*actualizamos cantidad
        const cantArticles = articlesArray.map(articulo => {
            if(articulo.id === infoArticle.id){
                articulo.cantidad++;
                return articulo; //*retorna objeto actualizado ++
            }else{
                return articulo; //*retorna no duplicados =
            }
        })

        //*carrito sin cambios
        articlesArray= [...cantArticles];
    }else{

        //*carrito + 1 art
        articlesArray = [...articlesArray, infoArticle];
    }

    //*actualiza html de carrito
    cartHTML();
}
//*actualiza html de carrito
function cartHTML(){

    //*limpiar html del carrito
    cleanHTML();

    articlesArray.forEach( article => {
        
        const { imagen, titulo, precio, cantidad } = article;
        const row = document.createElement('tr');
        row.innerHTML = 
        `
            <td ><img src='${imagen}' width='100'</td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href='#' class='cart-button__delete-article' data-id='${article.id}'>X</a></td>
        `;

        //*agregar el html
        containerCart.appendChild(row);
    })

}
function cleanHTML(){
    containerCart.innerHTML = ''; 
}
//! ----------------------------------CARRITO----------------------------------