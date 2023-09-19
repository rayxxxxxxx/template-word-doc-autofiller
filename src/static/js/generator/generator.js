
const loadTemplateForm = document.getElementById('form-load-template');
loadTemplateForm.addEventListener('submit', loadTemplateHandler);

const generatorForm = document.getElementById('generator-form');
generatorForm.addEventListener('submit', renderHanlder);

async function loadTemplateHandler(event) {
    event.preventDefault();
    let formData = new FormData(loadTemplateForm);
    let url = buildURL('localhost', 9443, '/generator/loadTemplate');
    let response = await fetchPostFile(url, 'templateWordDoc', formData.get('templateWordDoc'));
}

async function renderHanlder(event) {
    event.preventDefault();
    let formData = new FormData(generatorForm);
    let url = buildURL('localhost', 9443, '/generator/render');
    let response = await fetchPostJSON(url, Object.fromEntries(formData.entries()));

    let fileName = response.headers.get('content-disposition').split('=')[1].replace('"', '')

    let link = document.createElement('a');
    link.setAttribute('href', URL.createObjectURL(await response.blob()));
    link.setAttribute('download', fileName);
    link.click();
}