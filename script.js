const tableKey = 'cms-table';

let cmsTable;

let table = $('#cmsTableContainer');
let newRowTemplate = table.find('tr.template').clone(true);
newRowTemplate.removeClass('template');

function appendOrUpdateRow(rowId, fields) {
  let oldRow = table.find('tr').filter((idx, el) => {
    let row = $(el);
    return row.data('key') == rowId;
  });
  let newRow = newRowTemplate.clone(true);
  newRow.find('td').each((idx, el) => {
    let field = $(el);
    let key = field.data('key');
    field.text(fields[key]);
  });
  newRow.data('id', rowId);
  if (oldRow.length > 0) {
    oldRow.replaceWith(newRow);
  } else {
    table.append(newRow);
  }
}

function deleteRow(rowId) {
  let oldRow = table.find('tr').filter((idx, el) => {
    let row = $(el);
    return row.data('key') == rowId;
  });
  oldRow.remove();
  delete cmsTable[rowId];
  localStorage.setItem(tableKey, JSON.stringify(cmsTable));
}

let init = (reset = false) => {
  if (localStorage.getItem(tableKey) && !reset) {
    cmsTable = JSON.parse(localStorage.getItem(tableKey));
    Object.keys(cmsTable).forEach((rowId) => {
      let fields = cmsTable[rowId];
      appendOrUpdateRow(rowId, fields);
    });
  } else {
    cmsTable = {};
    table.find('tbody tr').not(newRowTemplate);
    localStorage.setItem(tableKey, JSON.stringify(cmsTable));
  }
};

$('#clearBtn').on('click', () => {
  init(true);
});

let modalBackdrop = $('#backdrop');
let newPersonModal = $('#newPersonModal');
let newPersonModalAndBackdrop = $('#newPersonModal, #backdrop');

let newPersonForm = newPersonModal.find('#newPersonForm');


newPersonForm.validate({
  normalizer: $.trim
});

newPersonForm.on('reset', () => {
  $(this).find('#newPersonName').prop('readonly', false);
});

let generateId = () => {
  let keys = Object.keys(cmsTable);
  if (keys.length == 0) return 1;
  return Math.max(...keys) + 1;
};

newPersonForm.on('submit', () => {
  let form = $(this);
  let fields = {};
  form.find('input').each((idx, el) => {
    let field = $(el);
    let key = field.data('key');
    let val = field.val();
    fields[key] = val;
  });
  fields.id = fields.id || generateId();
  cmsTable[fields.id] = fields;

  localStorage.setItem(tableKey, JSON.stringify(cmsTable));
  appendOrUpdateRow(fields.id, fields);
  newPersonModalAndBackdrop.hide();
});

$('#newPersonCancelBtn').on('click', () => {
  newPersonModalAndBackdrop.hide();
});


$('#cmsAddNewEntry').on('click', () => {
  newPersonForm.get(0).reset();
  newPersonModalAndBackdrop.show();
});
$(document).on('click', '.cms-edit', () => {
  let row = $(this).closest('tr');
  let rowId = row.data('id');
  let fields = cmsTable[rowId];

  newPersonForm.get(0).reset();
  newPersonForm.find('#newPersonName').prop('readonly', true);
  newPersonForm.find('input').each((idx, el) => {
    let field = $(el);
    let key = field.data('key');
    field.val(fields[key]);
  });

  newPersonModalAndBackdrop.show();
});
$(document).on('click', '.cms-delete', () => {
  let row = $(this).closest('tr');
  let rowId = row.data('id');
  let fields = cmsTable[rowId];
  let isSure = window.confirm('Are you sure you want to delete Bro ' + fields.name + '?');
  if (isSure) deleteRow(rowId);

});

init();