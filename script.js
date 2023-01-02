// Load the institutions from the file
function loadInstitutions() {
    return fetch('institutions.json')
      .then(response => response.json());
  }
  
  // Save the institutions to the file
  function saveInstitutions(institutions) {
    return fetch('institutions.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(institutions)
    });
  }
  
  // Add a new institution
  function addInstitution(name, location, type, otherInfo) {
    return loadInstitutions()
      .then(institutions => {
        institutions.push({
          name,
          location,
          type,
          otherInfo
        });
        return saveInstitutions(institutions);
      });
  }
  
  // Get information about an institution
  function getInstitution(name) {
    return loadInstitutions()
      .then(institutions => {
        return institutions.find(i => i.name === name);
      });
  }
  
  // Update the information about an institution
  function updateInstitution(name, newLocation, newType, newOtherInfo) {
    return loadInstitutions()
      .then(institutions => {
        const institution = institutions.find(i => i.name === name);
        institution.location = newLocation;
        institution.type = newType;
        institution.otherInfo = newOtherInfo;
        return saveInstitutions(institutions);
      });
  }
  
  // Delete an institution
  function deleteInstitution(name) {
    return loadInstitutions()
      .then(institutions => {
        const newInstitutions = institutions.filter(i => i.name !== name);
        return saveInstitutions(newInstitutions);
      });
  }
  
// Render the list of institutions
function renderInstitutions() {
    loadInstitutions()
      .then(institutions => {
        const table = document.querySelector('#institutions');
        table.innerHTML = '';
        institutions.forEach(institution => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${institution.name}</td>
            <td>${institution.location}</td>
            <td>${institution.type}</td>
            <td>${institution.otherInfo}</td>
            <td>
              <button class="update" data-name="${institution.name}">Update</button>
              <button class="delete" data-name="${institution.name}">Delete</button>
            </td>
          `;
          table.appendChild(row);
        });
      });
  }
  
  // Add event listeners
  document.querySelector('#add-form').addEventListener('submit', event => {
    event.preventDefault();
    const name = document.querySelector('#name').value;
    const location = document.querySelector('#location').value;
    const type = document.querySelector('#type').value;
    const otherInfo = document.querySelector('#other_info').value;
    addInstitution(name, location, type, otherInfo)
      .then(() => {
        renderInstitutions();
        document.querySelector('#name').value = '';
        document.querySelector('#location').value = '';
        document.querySelector('#other_info').value = '';
      });
  });
  
  document.querySelector('#institutions').addEventListener('click', event => {
    const name = event.target.dataset.name;
    if (event.target.classList.contains('update')) {
      // Update the institution
      const newLocation = prompt('Enter the new location:');
      const newType = prompt('Enter the new type:');
      const newOtherInfo = prompt('Enter the new other info:');
      updateInstitution(name, newLocation, newType, newOtherInfo)
        .then(() => renderInstitutions());
    }
