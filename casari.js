// js/casari.js

// Funcția pentru încărcarea modulelor Casări
function loadCasari(content) {
    content.innerHTML = `
      <h3>Casări</h3>
      <form id="casariForm">
        <div class="form-group">
          <label for="articolCasat">Articol Casat</label>
          <input type="text" class="form-control" id="articolCasat" placeholder="Ex: Hârtie A4" required>
        </div>
        <div class="form-group">
          <label for="cantitateCasata">Cantitate Casată</label>
          <input type="number" class="form-control" id="cantitateCasata" placeholder="Ex: 10" required>
        </div>
        <button type="submit" class="btn btn-primary">Adaugă Casare</button>
      </form>
      <div id="outputCasari"></div>
    `;
  
    // Adăugare casare
    document.getElementById('casariForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const articol = document.getElementById('articolCasat').value.trim();
      const cantitate = parseInt(document.getElementById('cantitateCasata').value);
      if (!articol || isNaN(cantitate)) {
        alert("Completează corect articolul și cantitatea!");
        return;
      }
      const casare = {
        _id: new Date().toISOString(),
        articol: articol,
        cantitate: cantitate
      };
      dbCasari.put(casare).then(() => {
        alert("Casare adăugată!");
        document.getElementById('articolCasat').value = '';
        document.getElementById('cantitateCasata').value = '';
        afiseazaCasari();
      }).catch(err => {
        alert("Eroare la salvare casare!");
      });
    });
  
    // Afișare casări
    function afiseazaCasari() {
      dbCasari.allDocs({ include_docs: true }).then(result => {
        const lista = result.rows.map(row => {
          return `• Casare de ${row.doc.cantitate} bucăți de ${row.doc.articol}`;
        }).join('<br>');
        document.getElementById('outputCasari').innerHTML = lista || 'Nicio casare salvată.';
      }).catch(err => {
        alert("Eroare la afișare casări!");
      });
    }
  
    afiseazaCasari();
  }
  