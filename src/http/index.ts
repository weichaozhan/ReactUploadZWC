const http:ReactUploadZWC.IHttp = (params) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const method = (params.method ?? 'GET').toUpperCase();
    
    let args: string | FormData;
    let url = params.url ?? '';
    const data = params.data ?? {};

    if (method === 'GET') {
      args = '?';
      Object.keys(data).forEach((param, index) => {
        args += `${index === 0 ? '' : '&'}${param}=${data[param]}`;
      });
      url = `${url}${args}`;
    } else {
      const formData = new FormData();
      Object.keys(data).forEach((param) => {
        formData.append(param, data[param]);
      });
      params.file && formData.append(params.fileName ?? 'file', params.file);
      args = formData;
    }

    xhr.open(method, url, params.async ?? true);
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = (err) => {
      reject(err);
    };
    
    
    xhr.setRequestHeader('Content-Type', '');
    xhr.send(method === 'GET' ? null : args);
  });
};

export default http;
