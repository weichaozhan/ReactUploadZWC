
import { ReactUploadZWC } from '../../@types';

export const useUploadAction = (beforeUpload?: ReactUploadZWC.TBeforeUpload) => {
  const beforeUploadAction = (files: FileList | File[] | null) => {
    if (!beforeUpload) {
      return new Promise(resolve => {
        resolve(true);
      });
    }
    return new Promise((resolve, reject) => {
      const result = beforeUpload(files);
      
      if (typeof result === 'boolean') {
        if (result) {
          resolve(true);
        } else {
          reject(new Error('err'));
        }
      } else {
        result
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(new Error(`${err}`));
          });
      }
    });
  };

  return [
    beforeUploadAction
  ];
};