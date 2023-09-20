const form = document.getElementById('main-form');

// let fieldDescriptorUUID = 0;
let formDescriptor = new FormDescriptor();

function initListeners() {
    form.addEventListener('submit', submitHandler);
}

function submitHandler(event) {
    event.preventDefault();

    let formData = new FormData(form);
    formDescriptor.formName = formData.get('formName');

    let uuid = crypto.randomUUID();

    let fieldDescriptor = FieldDescriptor.fromFormData(formData);
    formDescriptor.addFieldDescriptor(uuid, fieldDescriptor);
    addFieldDescriptorElement(uuid, fieldDescriptor, formDescriptor);

    // fieldDescriptorUUID += 1;
}

async function downloadAsJSON() {
    if (formDescriptor.isEmpty()) {
        alert('there are no field to save');
        return;
    }

    let formDescriptorBLOB = new Blob([JSON.stringify(formDescriptor.asJSON())], {
        'type': 'application/json'
    });

    let link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(formDescriptorBLOB));
    link.setAttribute('download', formDescriptor.formName);
    link.click();
    link.remove();
}

initListeners();