// js/iesiri.js

// Funcția pentru încărcarea modulelor Ieșiri
function loadIesiri(content) {
    content.innerHTML = `
      <h3>Ieșiri</h3>
      <form id="iesiriForm">
        <div class="form-group">
          <label for="articolIesire">Articol</label>
          <input type="text" class="form-control" id="articolIesire" placeholder="Ex: Hârtie A4" required>
        </div>
        <div class="form-group">
          <label for="cantitateIesire">Cantitate</label>
          <input type="number" class="form-control" id="cantitateIesire" placeholder="Ex: 50" required>
        </div>
        <button type="submit" class="btn btn-primary">Adaugă Ieșire</button>
      </form>
      <div id="outputIesiri"></div>
    `;
  
    // Adăugare ieșire
    document.getElementById('iesiriForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const articol = document.getElementById('articolIesire').value.trim();
      const cantitate = parseInt(document.getElementById('cantitateIesire').value);
      if (!articol || isNaN(cantitate)) {
        alert("Completează corect articolul și cantitatea!");
        return;
      }
      const iesire = {
        _id: new Date().toISOString(),
        articol: articol,
        cantitate: cantitate
      };
      dbIesiri.put(iesire).then(() => {
        alert("Ieșire adăugată!");
        document.getElementById('articolIesire').value = '';
        document.getElementById('cantitateIesire').value = '';
        afiseazaIesiri();
      }).catch(err => {
        alert("Eroare la salvare ieșire!");
      });
    });
  
    // Afișare ieșiri
    function afiseazaIesiri() {
      dbIesiri.allDocs({ include_docs: true }).then(result => {
        const lista = result.rows.map(row => {
          return `• Ieșire: ${row.doc.articol} – ${row.doc.cantitate} bucăți`;
        }).join('<br>');
        document.getElementById('outputIesiri').innerHTML = lista || 'Nicio ieșire salvată.';
      }).catch(err => {
        alert("Eroare la afișare ieșiri!");
      });
    }
  
    afiseazaIesiri();
  }
  