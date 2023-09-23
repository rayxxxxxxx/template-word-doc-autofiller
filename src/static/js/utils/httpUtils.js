function buildURL(host, port, path, params = undefined) {
    let origin = `https://${host}:${port}`;
    let paramsList = [];
    if (params) {
        for (const [k, v] of Object.entries(params)) {
            paramsList.push(`${k}=${v}`);
        }
    }
    return new URL(`${origin}${path}?${paramsList.join('&')}`);
}

async function fetchGetText(url) {
    let response = await fetch(url, {
        'method': 'GET',
        'headers': {
            'Content-type': 'text',
        }
    });
    return await response;
}

async function fetchGetJSON(url) {
    let response = await fetch(url, {
        'method': 'GET',
        'headers': {
            'Content-type': 'application/json',
        }
    });
    return await response;
}

async function fetchPostJSON(url, body) {
    let response = await fetch(url, {
        'method': 'POST',
        'headers': {
            'Content-type': 'application/json',
        },
        'body': JSON.stringify(body)
    });
    return await response;
}

async function fetchPostFile(url, name, file) {
    let formData = new FormData();
    formData.append(name, file);
    let response = await fetch(url, {
        'method': 'POST',
        'body': formData
    });
    return response;
}

async function fetchPostFiles(url, files) {
    let formData = new FormData();
    for (const [key, file] of Object.entries(files)) {
        formData.append(key, file);
    }
    let response = await fetch(url, {
        'method': 'POST',
        'body': formData
    });
    return response;
}
