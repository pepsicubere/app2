// js/intrari.js

// Funcția pentru încărcarea modulelor Intrări
function loadIntrari(content) {
    content.innerHTML = `
      <h3>Intrări</h3>
      <form id="intrariForm">
        <div class="form-group">
          <label for="articolIntrare">Articol</label>
          <input type="text" class="form-control" id="articolIntrare" placeholder="Ex: Hârtie A4" required>
        </div>
        <div class="form-group">
          <label for="cantitateIntrare">Cantitate</label>
          <input type="number" class="form-control" id="cantitateIntrare" placeholder="Ex: 100" required>
        </div>
        <button type="submit" class="btn btn-primary">Adaugă Intrare</button>
      </form>
      <div id="outputIntrari"></div>
    `;
  
    // Adăugare intrare
    document.getElementById('intrariForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const articol = document.getElementById('articolIntrare').value.trim();
      const cantitate = parseInt(document.getElementById('cantitateIntrare').value);
      if (!articol || isNaN(cantitate)) {
        alert("Completează corect articolul și cantitatea!");
        return;
      }
      const intrare = {
        _id: new Date().toISOString(),
        articol: articol,
        cantitate: cantitate
      };
      dbIntrari.put(intrare).then(() => {
        alert("Intrare adăugată!");
        document.getElementById('articolIntrare').value = '';
        document.getElementById('cantitateIntrare').value = '';
        afiseazaIntrari();
      }).catch(err => {
        alert("Eroare la salvare intrare!");
      });
    });
  
    // Afișare intrări
    function afiseazaIntrari() {
      dbIntrari.allDocs({ include_docs: true }).then(result => {
        const lista = result.rows.map(row => {
          return `• Intrare: ${row.doc.articol} – ${row.doc.cantitate} bucăți`;
        }).join('<br>');
        document.getElementById('outputIntrari').innerHTML = lista || 'Nicio intrare salvată.';
      }).catch(err => {
        alert("Eroare la afișare intrări!");
      });
    }
  
    afiseazaIntrari();
  }
  