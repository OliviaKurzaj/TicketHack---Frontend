

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
        if (result.result === true) {
            if (document.querySelector('#default-result')) {
                document.querySelector('#default-result').remove()
            }
            if (document.querySelector('#notfound')) {
                document.querySelector('#notfound').remove();
            }
            if (document.querySelector('.result')) {
                var element = document.getElementById("parent");
                while (element.firstChild) {
                    element.removeChild(element.firstChild);
                    // OR 
                    element.firstChild.remove();
                }
            }
            result.trips.forEach((trip, index) => {
                let departure = trip.departure;
                let arrival = trip.arrival;
                let date = new Date(trip.date);
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let stringDate = `${hours} : ${minutes}`
                let price = trip.price;
                let searchResult = `<div id="result${index}" class="result">
                    <p class="result-data">${departure} > ${arrival}</p>
                    <p class="result-data">${stringDate}</p>
                    <p class="result-data">${price}€</p>
                    <div class="btn-delete result-data">Book</div>
                </div>`;
                document.querySelector('.result-container').innerHTML += searchResult;
            });
        } else {
            document.querySelector('#default-result').remove()
            let noFindResult = `<img id="notfound" src="./img/notfound.png" alt="not found">`;
            document.querySelector('.result-container').innerHTML += noFindResult;
            console.error("Erreur lors de la récupération des données", response.status);
        }
    } catch (error) {
        console.error("Erreur de la requête", error);
    }
});