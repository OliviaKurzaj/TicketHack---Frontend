console.log('hey')
fetch('http://localhost:3000/bookings')
	.then(response => response.json())
    .then(bookingData => {
        console.log(bookingData)

        if(bookingData){
        console.log("full");

        document.querySelector('.cart-content').innerHTML += `
        <div class="cart-result">
            <h2>My bookings</h2>
            <div class="wrapper-booking"></div>
            <span class="trait"></span>
            <p class="green bottom">Enjoy your travel with Tickethack!</p>
        </div>
        `;
			for (let i = 0; i < bookingData.bookingResult.length; i++) {

            console.log(bookingData[i]);

            let departure = bookingData.bookingResult[i].departure;
            let arrival = bookingData.bookingResult[i].arrival;
            let date = new Date(bookingData.bookingResult[i].date);
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let stringDate = `${hours} : ${minutes}`
            let price = bookingData.bookingResult[i].price;
                document.querySelector('.wrapper-booking').innerHTML += `
                <div class="result-wrap"">
                    <p>${departure}</p>
                    <p class="date-cart">${stringDate}</p>
                    <p><span class="price-cart">${price}</span>€</p>
                    <p>Departure in <span class="restHour"></span>hours</p>
                </div>
                `;				
			}
		}else{
            // console.log("empty")
            document.querySelector('.booking-content').innerHTML += `
			<div class="cart-empty">
                <p>No tickets in your booking.<br><br></p>
                <p>Why not plan a trip?</p>
            </div>
			`;
        }

	});
