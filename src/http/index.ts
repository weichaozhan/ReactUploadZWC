export const buildFileName = (fileName: string, filesLength: number, index: number) => {
  return `${fileName}${filesLength === 1 ? '' : index + 1}`;
};

const http:ReactUploadZWC.IHttp = ({
  method = 'GET',
  url = '',
  data = {},
  async = true,
  fileName = 'file',
  file,
  files
}) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const methodUpper = method.toUpperCase();
    
    let args: string | FormData;
    let urlStr = url;

    if (methodUpper === 'GET') {
      args = '?';
      Object.keys(data).forEach((param, index) => {
        args += `${index === 0 ? '' : '&'}${param}=${data[param]}`;
      });
      urlStr = `${urlStr}${args}`;
    } else {
      const formData = new FormData();
      
      Object.keys(data).forEach((param) => {
        formData.append(param, data[param]);
      });

      file && formData.append(fileName, file);
      files?.forEach((file, index) => {
        formData.append(buildFileName(fileName, files.length, index), file);
      });
      args = formData;
    }

    xhr.open(methodUpper, urlStr, async);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error(`status: ${xhr.status}, statusText: ${xhr.statusText}`));
      }
    };
    
    xhr.setRequestHeader('Content-Type', '');
    xhr.send(methodUpper === 'GET' ? null : args);
  });
};

export default http;
