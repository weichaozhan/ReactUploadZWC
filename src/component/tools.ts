import { ReactUploadZWC } from '../../@types/reactUploadZWC';
import { TFileListShow, IFileShow } from './FileList';

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

export const buildFileListShowFromFileList = (fileList: ReactUploadZWC.TFileList | undefined, fileListInnerCurrent: TFileListShow, indexDelete: number[]) => {
  let newFileList: (File | Partial<File> | undefined)[] = [...(fileList ?? [])];
  indexDelete.forEach(num => {
    newFileList.splice(num, 0, undefined);
  });
  
  const newList: TFileListShow = [];
  newFileList.forEach((item, indexNow) => {
    const preFile = fileListInnerCurrent.filter((file, indexPre) => {
      return file.file === item && indexNow === indexPre;
    })[0];
    if (item) {
      newList.push({
        file: item,
        state: preFile?.state ? preFile?.state : 'success'
      });
    }
  });

  return newList;
};
