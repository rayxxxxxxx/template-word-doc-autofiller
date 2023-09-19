const form = document.getElementById('main-form');

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
}

async function downloadAsJSON() {
    if (formDescriptor.isEmpty()) {
        alert('there are no field to save');
        return;
    }

    let formDescriptorBLOB = new Blob([JSON.stringify(formDescriptor.asJSON())], {
        'type': 'application/json'
    });

    // window.location = URL.createObjectURL(formDescriptorBLOB);

    let link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(formDescriptorBLOB));
    link.setAttribute('download', formDescriptor.formName);
    link.click();
    link.remove();
}

initListeners();