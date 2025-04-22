// js/articole.js

// Funcția pentru încărcarea modulelor Articole
function loadArticole(content) {
    content.innerHTML = `
      <h3>Articole</h3>
      <form id="articolForm">
        <div class="form-group">
          <label for="nume">Nume Articol:</label>
          <input type="text" class="form-control" id="nume" placeholder="Ex: Hârtie A4" required>
        </div>
        <div class="form-group">
          <label for="cantitate">Cantitate:</label>
          <input type="number" class="form-control" id="cantitate" placeholder="Ex: 50" required>
        </div>
        <button type="submit" class="btn btn-primary">Adaugă Articol</button>
      </form>
      <div id="outputArticole"></div>
    `;
  
    // Adăugare articol
    document.getElementById('articolForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const nume = document.getElementById('nume').value.trim();
      const cantitate = parseInt(document.getElementById('cantitate').value);
      if (!nume || isNaN(cantitate)) {
        alert("Completează corect numele și cantitatea!");
        return;
      }
      const articol = {
        _id: new Date().toISOString(),
        nume: nume,
        cantitate: cantitate
      };
      dbArticole.put(articol).then(() => {
        alert("Articol adăugat!");
        document.getElementById('nume').value = '';
        document.getElementById('cantitate').value = '';
        afiseazaArticole();
      }).catch(err => {
        alert("Eroare la salvare articol!");
      });
    });
  
    // Afișare articole
    function afiseazaArticole() {
      dbArticole.allDocs({ include_docs: true }).then(result => {
        const lista = result.rows.map(row => {
          return `• ${row.doc.nume} – ${row.doc.cantitate} bucăți`;
        }).join('<br>');
        document.getElementById('outputArticole').innerHTML = lista || 'Niciun articol salvat.';
      }).catch(err => {
        alert("Eroare la afișare articole!");
      });
    }
  
    afiseazaArticole();
  }
  