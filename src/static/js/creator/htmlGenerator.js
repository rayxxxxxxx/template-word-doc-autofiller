function addFieldDescriptorElement(elementId, fieldDescriptor, formDescriptor) {
    let descriptorElement = document.createElement('div');
    let descriptorAttributesElement = document.createElement('div');
    let descriptorLabel = document.createElement('p');
    let descriptorType = document.createElement('p');
    let descriptorRequired = document.createElement('p');
    let removeDescriptorButton = document.createElement('button');

    descriptorElement.appendChild(descriptorAttributesElement);
    descriptorElement.appendChild(removeDescriptorButton);
    descriptorAttributesElement.appendChild(descriptorLabel);
    descriptorAttributesElement.appendChild(descriptorType);
    descriptorAttributesElement.appendChild(descriptorRequired);

    descriptorElement.setAttribute('class', 'field-descriptor');
    descriptorElement.setAttribute('id', elementId);

    descriptorAttributesElement.setAttribute('class', 'descriptor-attributes');

    descriptorLabel.setAttribute('class', 'descriptor-label');
    descriptorLabel.innerHTML = 'name: ' + fieldDescriptor.label;

    descriptorType.setAttribute('class', 'descriptor-type');
    descriptorType.innerHTML = 'type: ' + fieldDescriptor.type;

    descriptorRequired.setAttribute('class', 'descriptor-required');
    descriptorRequired.innerHTML = 'required: ' + fieldDescriptor.required;

    removeDescriptorButton.setAttribute('class', 'descriptor-remove-button');
    removeDescriptorButton.innerText = 'remove';
    removeDescriptorButton.onclick = removeDescriptorHandler.bind(this, elementId, formDescriptor);

    document.getElementById('form-descriptor').appendChild(descriptorElement);
}

function removeDescriptorHandler(descriptorId, formDescriptor) {
    delete formDescriptor.removeFieldDescriptor(descriptorId);
    document.getElementById(descriptorId).remove();
}