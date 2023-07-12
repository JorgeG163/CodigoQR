    // Objeto para realizar el seguimiento de la cantidad de especies
    let speciesCount = {};

    // Capa de marcadores para agregar las marcas al mapa
    const markersLayer = L.layerGroup().addTo(map);

    // Función para agregar una marca al mapa
    function addMarkerToMap(latitude, longitude) {
      const marker = L.marker([latitude, longitude]).addTo(markersLayer);
      return marker;
    }

    // Cargar las marcas guardadas desde el almacenamiento local
    function loadMarkersFromStorage() {
      const markers = JSON.parse(localStorage.getItem('markers')) || [];

      markers.forEach(function (markerData) {
        const marker = addMarkerToMap(markerData.latitude, markerData.longitude);

        // Actualizar el contador de especies
        speciesCount[markerData.species] = (speciesCount[markerData.species] || 0) + 1;

        // Agregar evento de clic al marcador para resaltarlo en la tabla
        marker.on('click', function () {
          highlightTableRow(markerData.species);
        });
      });

      // Actualizar la tabla de especies
      updateSpeciesTable();
    }

    // Guardar una marca en el almacenamiento local
    function saveMarkerToStorage(latitude, longitude, species) {
      const markerData = { latitude: latitude, longitude: longitude, species: species };
      const markers = JSON.parse(localStorage.getItem('markers')) || [];

      markers.push(markerData);
      localStorage.setItem('markers', JSON.stringify(markers));
    }

    // Eliminar una marca del almacenamiento local
    function deleteMarkerFromStorage(latitude, longitude, species) {
      const markers = JSON.parse(localStorage.getItem('markers')) || [];

      // Filtrar las marcas para eliminar la que coincide con las coordenadas y especie proporcionadas
      const updatedMarkers = markers.filter(function (markerData) {
        return !(markerData.latitude === latitude && markerData.longitude === longitude && markerData.species === species);
      });

      localStorage.setItem('markers', JSON.stringify(updatedMarkers));
    }

    // Actualizar la tabla con los datos de las especies
    function updateSpeciesTable() {
      const tableBody = document.querySelector('#markerTable tbody');
      tableBody.innerHTML = '';

      for (const species in speciesCount) {
        const tableRow = document.createElement('tr');
        const speciesCell = document.createElement('td');
        const countCell = document.createElement('td');

        speciesCell.textContent = species;
        countCell.textContent = speciesCount[species];

        tableRow.appendChild(speciesCell);
        tableRow.appendChild(countCell);

        tableBody.appendChild(tableRow);
      }
    }

    // Resaltar la fila de especie en la tabla
    function highlightTableRow(species) {
      const tableRows = document.querySelectorAll('#markerTable tbody tr');

      tableRows.forEach(function (row) {
        if (row.cells[0].textContent === species) {
          row.classList.add('highlight');
        } else {
          row.classList.remove('highlight');
        }
      });
    }

    // Manejar el evento de carga de la página
    window.addEventListener('load', function () {
      loadMarkersFromStorage();
    });

    // Manejar el envío del formulario
    document.getElementById('coordinateForm').addEventListener('submit', function (event) {
      event.preventDefault(); // Evitar la recarga de página

      // Obtener los valores de latitud, longitud y especie del formulario
      const latitude = parseFloat(document.getElementById('latitude').value);
      const longitude = parseFloat(document.getElementById('longitude').value);
      const species = document.getElementById('species').value;

      // Crear una marca en el mapa con las coordenadas proporcionadas
      const marker = addMarkerToMap(latitude, longitude);

      // Guardar la marca en el almacenamiento local
      saveMarkerToStorage(latitude, longitude, species);

      // Actualizar el contador de especies
      speciesCount[species] = (speciesCount[species] || 0) + 1;

      // Agregar evento de clic al marcador para resaltarlo en la tabla
      marker.on('click', function () {
        highlightTableRow(species);
      });

      // Actualizar la tabla de especies
      updateSpeciesTable();

      // Limpiar los campos del formulario
      document.getElementById('latitude').value = '';
      document.getElementById('longitude').value = '';
      document.getElementById('species').value = '';

      console.log('Marca guardada:', { latitude, longitude, species });
    });

    // Manejar el evento del botón "Borrar"
    document.getElementById('deleteButton').addEventListener('click', function (event) {
      event.preventDefault(); // Evitar la recarga de página

      // Eliminar todas las marcas del mapa
      markersLayer.clearLayers();

      // Eliminar los datos guardados localmente, reiniciar el contador de especies y limpiar la tabla
      localStorage.removeItem('markers');
      speciesCount = {};
      updateSpeciesTable();

      console.log('Marcas eliminadas');
    });


