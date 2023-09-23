
const loadTemplateForm = document.getElementById('form-load-template');
loadTemplateForm.addEventListener('submit', loadTemplateHandler);

const generatorForm = document.getElementById('generator-form');
generatorForm.addEventListener('submit', renderHandlder);

async function loadTemplateHandler(event) {
    event.preventDefault();

    let formData = new FormData(loadTemplateForm);

    let url = buildURL('localhost', 9999, '/generator/loadTemplate');
    let response = await fetchPostFile(url, 'templateWordDoc', formData.get('templateWordDoc'));
}

async function renderHandlder(event) {
    event.preventDefault();

    let formData = new FormData(generatorForm);

    let url = buildURL('localhost', 9999, '/generator/render');
    let response = await fetchPostJSON(url, Object.fromEntries(formData.entries()));

    if (response.status == 200) {
        let fileName = response.headers.get('content-disposition').split('=')[1].replace('"', '');
        downloadPrompt(URL.createObjectURL(await response.blob()), fileName);
    }
    else if (response.status == 500) {
        document.write(await response.text());
    }
}

function downloadPrompt(url, name) {
    let link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', name);
    link.click();
    link.remove();
}
