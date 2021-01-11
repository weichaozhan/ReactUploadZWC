import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { ReactUploadZWC } from '../../@types/reactUploadZWC';

import styles from './Index.scss';
import { useUploadAction } from './customHooks';
import { getNewFileListState, uploadFilesAction } from './tools';

import Dragger from './Dragger';
import FileList, { TFileListShow } from './FileList';

type TProps = ReactUploadZWC.IUploadProps;

const Upload: FC<TProps> & {
  Dragger: typeof Dragger;
} = ({
  type = 'select',
  accept,
  action,
  onChange,
  data,
  fileName,
  children,
  className = '',
  beforeUpload,
  directory = false,
  style = {},
  multiple = false,
  disabled = false,
  outterClassName = '',
  innerClassName = '',
  headers,
  withCredentials,
  customAction,
  showFileList,
  fileList,
  customFileList,
  onChangeFileList,
  onDeleteFile,
  uploadFailed = (err) => err,
  uploadSuccess = (res) => res
}) => {
  const fileInputFile: React.MutableRefObject<any> = useRef(null);
  const [beforeUploadAction] = useUploadAction(beforeUpload);

  const [fileListInner, setFileListInner] = useState<TFileListShow>([]);
  const fileListInnerCurrent = useRef<TFileListShow>(fileListInner);

  useEffect(() => {
    const newList = [...(fileList ?? [])].map(item => {
      const preFile = fileListInnerCurrent.current.filter(file => {
        return file.file === item;
      })[0];
      return {
        file: item,
        state: preFile?.state ? preFile?.state : 'success'
      };
    });
    setFileListInner(newList);
  }, [fileList]);
  useEffect(() => {
    fileListInnerCurrent.current = fileListInner;
  }, [fileListInner]);
  useEffect(() => {
    (fileInputFile.current as (HTMLInputElement & {
      webkitdirectory: boolean
    })).webkitdirectory = directory;
  }, [directory]);
  
  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.length ? [...e.target.files] : e.target.files;
    const fileListCurrent: TFileListShow = fileListInner.concat([...(e.target.files ?? [])].map(item => ({
      file: item
    })));
    
    if (!fileList) {
      setFileListInner(fileListCurrent);
    }
    onChangeFileList?.(fileListCurrent.map(item => item.file));
    uploadFiles(files);

    fileInputFile.current.value = '';
  };
  const uploadFiles = async (files: File[] | FileList | null) => {
    onChange?.(files, fileListInner.map(item => item.file));
    
    try {
      await beforeUploadAction(files);
  
      if (!files?.length) {
        return;
      }

      if (customAction) {
        customAction(files, fileListInner);
        return;
      }
  
      const newFileList: TFileListShow = fileListInner.concat(Array.prototype.map.call(files, item => ({
        file: item
      })) as TFileListShow);
      setFileListInner(
        getNewFileListState(newFileList, fileListInner, 'loading')
      );

      if (typeof action === 'string') {
        uploadFilesAction({
          action: action as string,
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
          setFileListInner
        });
      } else {
        action?.([...files]);
      }
    } catch {
    }
  };

  const clickCloseIcon = (index, fileDelete) => {
    const newFiles = [...fileListInner].filter((...rest) => rest[1] !== index);
    const files = newFiles.map(item => item.file) as File[];

    onChangeFileList?.(files);
    
    onDeleteFile?.(fileDelete, index, files);
    if (!fileList) {
      setFileListInner(newFiles);
    }
  };

  const onFileDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    if (type === 'drag') {
      e.preventDefault();
      const files = [...(e.dataTransfer.files ?? [])];
      
      e.type === 'drop' && uploadFiles(files);
    }
  };

  const clickLabel = (e: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    e.preventDefault();
    fileInputFile.current.click();
  };

  const clickFileInputFile = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.stopPropagation();
  };
  
  return <div className={classNames(styles['wrapper'], outterClassName)} >
    <div
      className={classNames(styles['wrapper-real'], innerClassName)}
    >
      <label
        style={{ ...style }}
        className={classNames(
          styles['button-upload'],
          {
            [styles['disabled']]: disabled
          },
          className
        )}
        onClick={clickLabel}
        onDrop={onFileDrop}
        onDragOver={onFileDrop}
        onDragLeave={onFileDrop}
      >
        {children}
        <input
          accept={accept}
          className={styles['file-input']}
          ref={fileInputFile}
          type="file"
          onChange={changeFile}
          onClick={clickFileInputFile}
          multiple={multiple}
          disabled={disabled}
        />
      </label>
    </div>

    {(showFileList && !customAction && !customFileList) && <FileList
      fileList={fileListInner}
      clickCloseIcon={clickCloseIcon}
    />}
    {customFileList}
  </div>;
};

Upload.Dragger = Dragger;

export default Upload;