
import { ReactUploadZWC } from '../../../@types';

export const buildFileName = (fileName: string, multiple: boolean, index: number) => {
  return `${fileName}${!multiple ? '' : index + 1}`;
};

const http:ReactUploadZWC.IHttp = ({
  method = 'GET',
  url = '',
  data = {},
  async = true,
  fileName = 'file',
  file,
  files,
  multiple,
  headers
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
      if (files) {
        for (let index = 0; index < files.length; index++) {
          const file = files[index];
          formData.append(buildFileName(fileName, !!multiple, index), file);

          if (!multiple && file) {
            break;
          }
        }
      }
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

    if (headers) {
      Object.entries(headers).forEach((item) => {
        xhr.setRequestHeader(item[0], item[1]);
      });
    }
    
    xhr.send(methodUpper === 'GET' ? null : args);
  });
};

export default http;
