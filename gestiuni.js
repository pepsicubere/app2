// js/gestiuni.js

// Funcția pentru încărcarea modulelor Gestiuni
function loadGestiuni(content) {
    content.innerHTML = `
      <h3>Gestiuni</h3>
      <form id="gestiuniForm">
        <div class="form-group">
          <label for="nume">Nume Gestiune</label>
          <input type="text" class="form-control" id="nume" placeholder="Ex: Gestiunea A" required>
        </div>
        <div class="form-group">
          <label for="locatie">Locație</label>
          <input type="text" class="form-control" id="locatie" placeholder="Ex: Depozit principal" required>
        </div>
        <button type="submit" class="btn btn-primary">Adaugă Gestiune</button>
      </form>
      <div id="outputGestiuni"></div>
    `;
  
    // Adăugare gestiune
    document.getElementById('gestiuniForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const nume = document.getElementById('nume').value.trim();
      const locatie = document.getElementById('locatie').value.trim();
      if (!nume || !locatie) {
        alert("Completează corect numele și locația!");
        return;
      }
      const gestiune = {
        _id: new Date().toISOString(),
        nume: nume,
        locatie: locatie
      };
      dbGestiuni.put(gestiune).then(() => {
        alert("Gestiune adăugată!");
        document.getElementById('nume').value = '';
        document.getElementById('locatie').value = '';
        afiseazaGestiuni();
      }).catch(err => {
        alert("Eroare la salvare gestiune!");
      });
    });
  
    // Afișare gestiuni
    function afiseazaGestiuni() {
      dbGestiuni.allDocs({ include_docs: true }).then(result => {
        const lista = result.rows.map(row => {
          return `• ${row.doc.nume} - ${row.doc.locatie}`;
        }).join('<br>');
        document.getElementById('outputGestiuni').innerHTML = lista || 'Nicio gestiune salvată.';
      }).catch(err => {
        alert("Eroare la afișare gestiuni!");
      });
    }
  
    afiseazaGestiuni();
  }
  