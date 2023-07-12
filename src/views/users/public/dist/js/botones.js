 // Crea el mapa
 const map = L.map('map-template').setView([9.315443327903317, -75.38846389797254], 18.14);

 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   maxZoom: 19,
   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
 }).addTo(map);