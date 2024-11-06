// GET /CART -> affiche mes cart
fetch('http://localhost:3000/cart')
    .then(response => response.json())
    .then(cartData => {
        // console.log(cartData)

        if (cartData) {

            document.querySelector('.cart-content').innerHTML += `
			<div class="cart-result">
                <h2>My cart</h2>

                <div class="wrapper">
                </div>

                <div class="purchase-footer-cart">
                    <div class="price-footer-cart">
                        Total : <span class="price-total-cart"></span>
                    </div>

                    <div class="btn-purchase-cart">
                        Purchase
                    </div>
            </div>
			`;
            let priceTotal = 0;

            for (let i = 0; i < cartData.cartResult.length; i++) {
                let departure = cartData.cartResult[i].departure;
                let stringDate = cartData.cartResult[i].date;
                console.log(stringDate);
                let price = cartData.cartResult[i].price;
                console.log(cartData.cartResult[i].price)
                priceTotal += price
                document.querySelector('.wrapper').innerHTML += `
                <div class="result-wrap"">
                    <p>${departure}</p>
                    <p class="date-cart">${stringDate}</p>
                    <p><span class="price-cart">${price}</span>€</p>
                    <div class="btn-delete-cart">X</div>
                </div>
                `;
            }

            document.querySelector('.price-total-cart').innerHTML += `
            ${priceTotal}€
            `;
            purchase();
            supress();
        } else {
            document.querySelector('.cart-content').innerHTML += `
			<div class="cart-empty">
                <p>No tickets in your cart.<br><br></p>
                <p>Why not plan a trip?</p>
            </div>
			`;
        }
    });


//PURCHASE
async function purchase() {
    document.querySelector('.btn-purchase-cart').addEventListener('click', async function () {
        try {
            const response = await fetch('http://localhost:3000/cart/paid')
            const result = response.json();
            console.log(result);
            document.querySelector('.cart-result').remove()
            document.querySelector('.cart-content').innerHTML += `
			<div class="cart-empty">
                <p>No tickets in your cart.<br><br></p>
                <p>Why not plan a trip?</p>
            </div>
			`;
        } catch (error) {
            console.error("Erreur de la requête", error);
        }

    })
}

//DELETE
async function supress() {
    for(let i = 0; i < document.querySelectorAll('.btn-delete-cart').length; i++){
        document.querySelectorAll('.btn-delete-cart')[i].addEventListener('click', async function() {
            try {
                this.parentNode.remove()
            } catch (error) {
                console.error("Erreur de la requête", error);
            }
        });
    }
};



