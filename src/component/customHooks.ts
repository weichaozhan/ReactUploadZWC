
import { Dispatch, MutableRefObject, SetStateAction, useRef } from 'react';
import { ReactUploadZWC } from '../../@types/reactUploadZWC';

import http from './http';
import { TFileListShow } from './FileList';
import { getNewFileListState } from './tools';

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

type TUploadRequestArgs = Pick<ReactUploadZWC.IUploadProps, 'data' | 'fileName' | 'headers' | 'multiple' | 'withCredentials' | 'timeout' | 'uploadFailed' | 'uploadSuccess'> & {
  files: File[] | FileList;
  action: string;
  setFileListInner: Dispatch<SetStateAction<TFileListShow>>;
  fileListInner: TFileListShow;
}
export const useUpload = (): [MutableRefObject<TFileListShow>, (args: TUploadRequestArgs) => void] => {
  const newFileList = useRef<TFileListShow>([]);
  const uploadFileRequest: (args: TUploadRequestArgs) => void = ({
    files,
    action,
    data,
    fileName,
    headers,
    multiple,
    withCredentials,
    timeout,
    setFileListInner,
    fileListInner,
    uploadFailed,
    uploadSuccess
  }) => {
    http({
      method: 'post',
      url: action,
      files: [...files],
      data,
      fileName,
      headers: {
        ...headers
      },
      multiple,
      timeout,
      withCredentials
    })
      .then(res => {
        setFileListInner(
          getNewFileListState(newFileList.current, fileListInner, 'success')
        );
        uploadSuccess?.(res, files, fileListInner.map(item => item.file));
      })
      .catch((err) => {
        setFileListInner(
          getNewFileListState(newFileList.current, fileListInner, 'failed')
        );
        uploadFailed?.(err, files, fileListInner.map(item => item.file));
      });
  };

  return [newFileList, uploadFileRequest];
};
