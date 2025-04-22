// js/stocuri.js

// Funcția pentru încărcarea modulelor Stocuri
function loadStocuri(content) {
  content.innerHTML = `
    <h3>Stocuri</h3>
    <form id="stocuriForm">
      <div class="form-group">
        <label for="articol">Articol</label>
        <input type="text" class="form-control" id="articol" placeholder="Ex: Hârtie A4" required>
      </div>
      <div class="form-group">
        <label for="cantitate">Cantitate</label>
        <input type="number" class="form-control" id="cantitate" placeholder="Ex: 100" required>
      </div>
      <button type="submit" class="btn btn-primary">Adaugă în Stoc</button>
    </form>
    <div id="outputStocuri"></div>
  `;

  // Adăugare stoc
  document.getElementById('stocuriForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const articol = document.getElementById('articol').value.trim();
    const cantitate = parseInt(document.getElementById('cantitate').value);
    if (!articol || isNaN(cantitate)) {
      alert("Completează corect articolul și cantitatea!");
      return;
    }
    const stoc = {
      _id: new Date().toISOString(),
      articol: articol,
      cantitate: cantitate
    };
    dbStocuri.put(stoc).then(() => {
      alert("Stoc adăugat!");
      document.getElementById('articol').value = '';
      document.getElementById('cantitate').value = '';
      afiseazaStocuri();
    }).catch(err => {
      alert("Eroare la salvare stoc!");
    });
  });

  // Afișare stocuri
  function afiseazaStocuri() {
    dbStocuri.allDocs({ include_docs: true }).then(result => {
      const lista = result.rows.map(row => {
        return `• ${row.doc.articol} – ${row.doc.cantitate} bucăți`;
      }).join('<br>');
      document.getElementById('outputStocuri').innerHTML = lista || 'Niciun stoc salvat.';
    }).catch(err => {
      alert("Eroare la afișare stocuri!");
    });
  }

  afiseazaStocuri();
}
