class FieldDescriptor {
    constructor(label, type, required) {
        this.label = label;
        this.type = type;
        this.required = required ? true : false
    }

    static fromFormData(formData) {
        let label = formData.get('label');
        let type = formData.get('type');
        let required = formData.get('required');
        return new FieldDescriptor(label, type, required);
    }
}

class FormDescriptor {
    constructor(formName = '') {
        this.formName = formName;
        this.fieldDescriptors = new Map();
    }

    isEmpty() {
        return this.fieldDescriptors.size == 0;
    }

    asArray() {
        return Array.from(this.fieldDescriptors.values());
    }

    asJSON() {
        return {
            'name': this.formName,
            'fields': this.asArray()
        }
    }

    addFieldDescriptor(descriptorId, descriptor) {
        this.fieldDescriptors.set(descriptorId, descriptor);
    }

    removeFieldDescriptor(descriptorId) {
        return this.fieldDescriptors.delete(descriptorId);
    }
}