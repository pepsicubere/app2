// js/transferuri.js

// Funcția pentru încărcarea modulelor Transferuri
function loadTransferuri(content) {
    content.innerHTML = `
      <h3>Transferuri</h3>
      <form id="transferuriForm">
        <div class="form-group">
          <label for="gestiuneSursa">Gestiunea Sursă</label>
          <input type="text" class="form-control" id="gestiuneSursa" placeholder="Ex: Gestiunea A" required>
        </div>
        <div class="form-group">
          <label for="gestiuneDestinatie">Gestiunea Destinație</label>
          <input type="text" class="form-control" id="gestiuneDestinatie" placeholder="Ex: Gestiunea B" required>
        </div>
        <div class="form-group">
          <label for="cantitate">Cantitate</label>
          <input type="number" class="form-control" id="cantitate" placeholder="Ex: 20" required>
        </div>
        <button type="submit" class="btn btn-primary">Adaugă Transfer</button>
      </form>
      <div id="outputTransferuri"></div>
    `;
  
    // Adăugare transfer
    document.getElementById('transferuriForm').addEventListener('submit', function(event) {
      event.preventDefault();
      const sursa = document.getElementById('gestiuneSursa').value.trim();
      const destinatie = document.getElementById('gestiuneDestinatie').value.trim();
      const cantitate = parseInt(document.getElementById('cantitate').value);
      if (!sursa || !destinatie || isNaN(cantitate)) {
        alert("Completează corect toate câmpurile!");
        return;
      }
      const transfer = {
        _id: new Date().toISOString(),
        sursa: sursa,
        destinatie: destinatie,
        cantitate: cantitate
      };
      dbTransferuri.put(transfer).then(() => {
        alert("Transfer adăugat!");
        document.getElementById('gestiuneSursa').value = '';
        document.getElementById('gestiuneDestinatie').value = '';
        document.getElementById('cantitate').value = '';
        afiseazaTransferuri();
      }).catch(err => {
        alert("Eroare la salvare transfer!");
      });
    });
  
    // Afișare transferuri
    function afiseazaTransferuri() {
      dbTransferuri.allDocs({ include_docs: true }).then(result => {
        const lista = result.rows.map(row => {
          return `• Transfer de ${row.doc.cantitate} bucăți de la ${row.doc.sursa} la ${row.doc.destinatie}`;
        }).join('<br>');
        document.getElementById('outputTransferuri').innerHTML = lista || 'Niciun transfer salvat.';
      }).catch(err => {
        alert("Eroare la afișare transferuri!");
      });
    }
  
    afiseazaTransferuri();
  }
  