// GET /CART -> affiche mes cart
fetch('http://localhost:3000/cart')
	.then(response => response.json())
    .then(cartData => {
        // console.log(cartData)

        if(cartData){
        // console.log("full")

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
            let arrival = cartData.cartResult[i].arrival;
            let date = new Date(cartData.cartResult[i].date);
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let stringDate = `${hours} : ${minutes}`
            let price = cartData.cartResult[i].price;
            console.log(cartData.cartResult[i].price)
            priceTotal += price

            console.log(priceTotal)

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

		}else{
            // console.log("empty")
            document.querySelector('.cart-content').innerHTML += `
			<div class="cart-empty">
                <p>No tickets in your cart.<br><br></p>
                <p>Why not plan a trip?</p>
            </div>
			`;
        }

	});

  





