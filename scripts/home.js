document.querySelector('#btn-search').addEventListener('click', async function() {
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

    if (response.ok) {
        const result = await response.json();  
        console.log(result);
    } else {
        console.error("Erreur lors de la récupération des données", response.status);
    }
} catch (error) {
    console.error("Erreur de la requête", error);
}
});