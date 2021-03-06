import React, { FC, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { ReactUploadZWC } from '../../@types/reactUploadZWC';

import styles from './Index.scss';
import { useUploadAction, useUpload } from './customHooks';
import { getNewFileListState, buildFileListShowFromFileList } from './tools';

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
  timeout = 5000,
  customFileList,
  defaultFileList,
  onChangeFileList,
  onDeleteFile,
  uploadFailed = (err) => err,
  uploadSuccess = (res) => res
}) => {
  const fileInputFile: React.MutableRefObject<any> = useRef(null);
  const [beforeUploadAction] = useUploadAction(beforeUpload);

  const [fileListInner, setFileListInner] = useState<TFileListShow>([...(defaultFileList ?? [])].map(item => ({
    file: item,
    state: 'success'
  })));
  const fileListInnerCurrent = useRef<TFileListShow>(fileListInner);
  const indexDelete = useRef<number[]>([]);
  const [newFileList, uploadFileRequest] = useUpload();

  useEffect(() => {
    if (fileList) {
      setFileListInner(buildFileListShowFromFileList(fileList, fileListInnerCurrent.current, indexDelete.current));
      indexDelete.current = [];
    }
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
  
      newFileList.current = fileListInner.concat(Array.prototype.map.call(files, item => ({
        file: item
      })) as TFileListShow);
      setFileListInner(
        getNewFileListState(newFileList.current, fileListInner, 'loading')
      );

      if (typeof action === 'string') {
        uploadFileRequest({
          action,
          files,
          data,
          fileName,
          headers,
          multiple,
          withCredentials,
          timeout,
          setFileListInner,
          uploadFailed,
          uploadSuccess,
          fileListInner
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
    indexDelete.current = [index];
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