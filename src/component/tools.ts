import http from './http/index';
import { ReactUploadZWC } from '../../@types/reactUploadZWC';
import { TFileListShow, IFileShow } from './FileList';
import { Dispatch, SetStateAction } from 'react';

export const getNewFileListState = (newFileList: TFileListShow, preFileList: TFileListShow, state: IFileShow['state']): TFileListShow => {
  const list = [...(newFileList ?? [])].map((item, newIndex: number) => {
    const preFile = preFileList.filter((file, preIndex: number) => {
      return file.file === item.file && newIndex === preIndex;
    })[0];
    return {
      file: item.file,
      state: preFile?.state ? (preFile?.state === 'loading' ? state : preFile?.state) : state
    };
  });
  
  return list;
};

export const uploadFilesAction: (args: Pick<ReactUploadZWC.IUploadProps, 'fileName' | 'data' | 'multiple' | 'headers' | 'withCredentials' | 'uploadSuccess' | 'timeout' | 'uploadFailed'> & {
  files: File[] | FileList;
  action: string;
  fileListInner: TFileListShow;
  newFileList: TFileListShow;
  setFileListInner: Dispatch<SetStateAction<TFileListShow>>;
}) => void = ({
  action,
  fileName,
  data,
  multiple,
  headers,
  withCredentials,
  files,
  newFileList,
  fileListInner,
  uploadSuccess,
  uploadFailed,
  timeout,
  setFileListInner
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
        getNewFileListState(newFileList, fileListInner, 'success')
      );
      uploadSuccess?.(res, files, fileListInner.map(item => item.file));
    })
    .catch((err) => {
      setFileListInner(
        getNewFileListState(newFileList, fileListInner, 'failed')
      );
      uploadFailed?.(err, files, fileListInner.map(item => item.file));
    });
};
