const addToDB = id => {
    let cartObj = {};
    const getCart = localStorage.getItem('shopping-cart');
    if(getCart){
        cartObj = JSON.parse(getCart);
    }else{
        cartObj = {};
    }
    const quantity = cartObj[id];
    if(quantity){
        const newQuantity = parseInt(quantity) + 1;
        cartObj[id] = newQuantity;
    }else{
        cartObj[id] = 1;
    }
    localStorage.setItem('shopping-cart', JSON.stringify(cartObj))
}

const removeFromLocalStorage = id => {
    const getCart = localStorage.getItem('shopping-cart');
    if(getCart){
        const cartObj = JSON.parse(getCart);
        if(cartObj){
            delete cartObj[id];
            localStorage.setItem('shopping-cart', JSON.stringify(cartObj))
        }
    }
}

const addCartFromLocalStorage = () => {
    let cartObj = {};
    const getCart = localStorage.getItem('shopping-cart');
    if(getCart){
        cartObj = JSON.parse(getCart);
    }else{
        cartObj = {};
    }
    return cartObj;
}


export {
    addToDB,
    addCartFromLocalStorage,
    removeFromLocalStorage
}