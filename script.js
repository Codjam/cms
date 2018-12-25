const tableKey = 'cms-table';

let clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
  localStorage.removeItem(tableKey);
});

let cmsTable;
let cmsTableDemo = {
  'Lamaj Reltub': {
    'phone': '202-202-2020',
    'address': '2020 Grant Avenue, TP, MD 20912'
  },
  'Eibmeht Reltub': {
    'phone': '302-303-3030',
    'address': '3030 Work Avenue, TP, MD 30913'
  }
}

let enableDisableNewInput = (option) => {
  let newPersonName = document.getElementById('newPersonName');

  if (option === 'enable')
    newPersonName.disabled = false;
  else if (option === 'disable')
    newPersonName.disabled = true;

}

let refreshDOMTable = () => {

  let cmsTableKeys = Object.keys(cmsTable);
  let tableContainer = document.getElementById('cmsTableContainer');
  let oldTableBody = document.getElementById('tableBody');
  tableContainer.removeChild(oldTableBody);
  let newTableBody = document.createElement('span');
  newTableBody.id = 'tableBody';
  tableContainer.appendChild(newTableBody);

  for (let i = 0; i < cmsTableKeys.length; i++) {
    let currentRow = document.createElement('div');
    let currentNameCol = document.createElement('div');
    let currentPhoneCol = document.createElement('div');
    let currentAddressCol = document.createElement('div');
    let currentEditBtn = document.createElement('div');
    let currentDeleteBtn = document.createElement('div');

    currentRow.className = 'cms-table-row';
    currentNameCol.className = 'cms-table-colum cms-name';
    currentPhoneCol.className = 'cms-table-colum cms-phone';
    currentAddressCol.className = 'cms-table-colum cms-address';
    currentEditBtn.className = 'cms-table-colum cms-edit';
    currentDeleteBtn.className = 'cms-table-colum cms-delete';


    currentNameCol.innerHTML = cmsTableKeys[i]
    currentPhoneCol.innerHTML = cmsTable[cmsTableKeys[i]].phone;
    currentAddressCol.innerHTML = cmsTable[cmsTableKeys[i]].address;


    currentEditBtn.innerHTML = '<i class = "fas fa-edit"> </i>';
    currentDeleteBtn.innerHTML = '<i class = "fas fa-trash-alt"> </i>';

    currentRow.appendChild(currentNameCol);
    currentRow.appendChild(currentPhoneCol);
    currentRow.appendChild(currentAddressCol);
    currentRow.appendChild(currentEditBtn);
    currentRow.appendChild(currentDeleteBtn);
    newTableBody.appendChild(currentRow);
  }

  let enableDisableNewUserModal = (option) => {
    let newPersonName = document.getElementById('newPersonName');
    let newPersonPhone = document.getElementById('newPersonPhone');
    let newPersonAddress = document.getElementById('newPersonAddress');
    newPersonName.value = '';
    newPersonPhone.value = '';
    newPersonAddress.value = '';

    let newPersonModal = document.getElementById('newPersonModal');
    let backdrop = document.getElementById('backdrop');

    newPersonModal.className = `${option}-modal`;
    backdrop.className = `${option}-modal`;
  }

  let addNewEntryBtn = document.getElementById('cmsAddNewEntry');
  let editBtns = document.getElementsByClassName('cms-edit');
  let deleteBtns = document.getElementsByClassName('cms-delete');

  let newPersonSubmitBtn = document.getElementById('newPersonSubmitBtn');
  let newPersonCancelBtn = document.getElementById('newPersonCancelBtn');

  newPersonSubmitBtn = addEventListener('click', () => {
    let newPersonName = document.getElementById('newPersonName').value.trim();
    let newPersonPhone = document.getElementById('newPersonPhone').value.trim();
    let newPersonAddress = document.getElementById('newPersonAddress').value.trim();

    if (newPersonName === '')
      document.getElementById('newPersonName').className = 'input-err';
    else document.getElementById('newPersonName').className = '';

    if (newPersonPhone === '')
      document.getElementById('newPersonPhone').classPhone = 'input-err';
    else document.getElementById('newPersonPhone').classPhone = '';

    if (newPersonAddress === '')
      document.getElementById('newPersonAddress').classAddress = 'input-err';
    else ndocument.getElementById('newPersonAddress').classAddress = '';

    if (newPersonName !== '' && newPersonPhone !== '' && newPersonAddress !== '') {
      let newPerson = {};
      cmsTable[newPersonName] = {
        'phone': newPersonPhone,
        'address': newPersonAddress
      }
      localStorage.setItem(tableKey, JSON.stringify(cmsTable));
      enableDisableNewUserModal('disable');
      refreshDOMTable();
    }
  });

  newPersonCancelBtn.addEventListener('click', () => {
    enableDisableNewUserModal('disable');
  })
  addNewEntryBtn.addEventListener('click', () => {
    enableDisableNewUserModal('enable');
  });


  for (let i = 0; i < editBtns.length; i++) {
    editBtns[i].addEventListener('click', ($event) => {
      let nameToEdit = $event.target.parentElement.children[0].innerText;
      let personToEdit = cmsTable[nameToEdit];
      enableDisableNewUserModal('enable');
      let newPersonName = document.getElementById('newPersonName');
      let newPersonPhone = document.getElementById('newPersonPhone');
      let newPersonAddress = document.getElementById('newPersonAddress');
      newPersonName.value = nameToEdit;
      newPersonPhone.value = personToEdit.phone;
      newPersonAddress.value = personToEdit.address;
      enableDisableNameInput('disable');
    })
  }



  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click', ($event) => {
      let nameTodelete = $event.target.parentElement.children[0].innerText;
      let isSure = windo.confirm('Are you sure you want to delete Bro' + nameTodelete + '?');
      if (isSure)
        deleteUserFromTable(nameToDelete);
    })
  }

}

letdeleteUserfromTable = (userName) => {
  let tempTable = {};
  let cmsTableKeys = Object.keys(cmsTable);
  for (let i = 0; i < cmsTableKeys.length; i++)
    if (userName !== cmsTableKeys[i]) {
      tempTable[cmsTableKeys[i]] = cmsTable[cmsTableKeys[i]]
    }


  cmsTable = tempTable;
  localStorage.setItem(tableKey, JSON.stringify(cmsTable));
  refreshDOMTable();
}

let init = () => {

  if (localStorage.getItem(tableKey)) {
    cmsTable = JSON.parse(localStorage.getItem(tableKey));
  } else {
    cmsTable = cmsTableDemo;
    localStorage.setItem(tableKey, JSON.stringify(cmsTable));
  }
  refreshDOMTable();

}

init();