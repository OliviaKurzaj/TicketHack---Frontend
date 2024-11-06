

//FAIRE LA RECHERCHE ET AFFICHER LES RESULTATS
document.querySelector('#btn-search').addEventListener('click', async function () {

    const searchedTrip = {
        departure: document.querySelector('#departureName').value,
        arrival: document.querySelector('#arrivalName').value,
        date: document.querySelector('#start').value
    };

    try {
        const response = await fetch('http://localhost:3000/home/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchedTrip),
        });
        const result = await response.json();
        console.log(result.result);
        if (result.result === true) {
            const div = document.querySelector('.result-container');
            while (div.firstChild) {
                div.removeChild(div.firstChild);
            }
            if (document.querySelector('#default-result')) {
                document.querySelector('#default-result').remove()
            }
            if (document.querySelector('#notfound')) {
                document.querySelector('#notfound').remove();
            }

            result.trips.forEach((trip, index) => { //PoUR CHAQUE VOYAGE CHERCHE
                let departure = trip.departure;
                let arrival = trip.arrival;
                let date = new Date(trip.date); //CONSTRUIRE UN OBJET DATE
                let hours = date.getHours(); // RECUPERER L'HEURE
                let minutes = date.getMinutes(); // RECUPERER LES MINUTES
                let stringDate = `${hours} : ${minutes}`
                let price = trip.price;
                let searchResult = `
                    <div id="result${index}" class="result">
                    <p class="result-data departure">${departure} > ${arrival}</p>
                    <p class="result-data date">${stringDate}</p>
                    <p class="result-data "><span class="price">${price}</span>€</p>
                    <a href="./cart.html"><div class="btn-delete result-data">Book</div></a>
                </div>`;
                document.querySelector('.result-container').innerHTML += searchResult;
            });
            addCart();
        } else {
            document.querySelector('#default-result').remove()
            let noFindResult = `   <div id="default-result">
                    <img id="train" src="./img/notfound.png" alt="train">
                    <span class="trait"></span>
                    <p class="black">Travel not found</p>
                </div>`;
            document.querySelector('.result-container').innerHTML += noFindResult;
        }
    } catch (error) {
        console.error("Erreur de la requête", error);
    }
});

//APPUYEZ SUR BOOK POUR AJOUTER AU PANIER

async function addCart() {


    for (let i = 0; i < document.querySelectorAll('.result').length; i++) {
        document.querySelectorAll('.result')[i].addEventListener('click', async function () {
            const tripToadd = {
                departure: document.querySelector('.departure').textContent,
                arrival: document.querySelector('.departure').textContent,
                date: document.querySelector('.date').textContent,
                price: Number(document.querySelector('.price').textContent),
            }
            console.log(tripToadd);
            try {
                const response = await fetch('http://localhost:3000/home/book', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(tripToadd),
                });
                const result = await response.json();
            } catch (error) {
                console.error("Erreur de la requête", error);
            }
        })
    }
}

