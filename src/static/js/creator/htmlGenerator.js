function addFieldDescriptorElement(elementId, fieldDescriptor, formDescriptor) {
    let root = document.createElement('div');
    let attrsElem = document.createElement('div');
    let labelElem = document.createElement('p');
    let typeElem = document.createElement('p');
    let requiredElem = document.createElement('p');
    let rmButton = document.createElement('button');

    root.appendChild(attrsElem);
    root.appendChild(rmButton);
    attrsElem.appendChild(labelElem);
    attrsElem.appendChild(typeElem);
    attrsElem.appendChild(requiredElem);

    root.setAttribute('class', 'field-descriptor');
    root.setAttribute('id', elementId);

    attrsElem.setAttribute('class', 'descriptor-attributes');

    labelElem.setAttribute('class', 'descriptor-label');
    labelElem.innerHTML = 'name: ' + fieldDescriptor.label;

    typeElem.setAttribute('class', 'descriptor-type');
    typeElem.innerHTML = 'type: ' + fieldDescriptor.type;

    requiredElem.setAttribute('class', 'descriptor-required');
    requiredElem.innerHTML = 'required: ' + fieldDescriptor.required;

    rmButton.setAttribute('class', 'descriptor-remove-button');
    rmButton.innerText = 'remove';
    rmButton.onclick = () => {
        formDescriptor.removeFieldDescriptor(descriptorId);
        document.getElementById(descriptorId).remove();
    };

    document.getElementById('form-descriptor').appendChild(root);
}