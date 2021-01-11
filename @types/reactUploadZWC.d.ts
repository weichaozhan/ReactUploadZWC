import { ReactNode } from "react";

export declare namespace ReactUploadZWC {
  import { CSSProperties } from 'react';
  
  type THttpParams = Partial<{
    method: string;
    url: string;
    async: boolean;
    username: string | null;
    password: string | null;
    data: {
      [props: string]: any
    };
    file: File;
    headers: {
      [props: string]: string;
    };
    files: File[];
    fileName: string;
    multiple: boolean;
    withCredentials: boolean;
    timeout?: number;
  }>;
  interface IHttp {
    (res: THttpParams): Promise;
  }

  type TFileList = (Partial<File>)[] | File[] | FileList;
  
  interface IHandlerFile {
    (file: File[] | FileList | null, fileList: TFileList): any;
  }

  interface IDragger {
    height?: number;
    width?: number;
  }

  type UploadType = 'drag' | 'select';

  type TBeforeUpload = (files: FileList | File[] | null) => (boolean | Promise<any>);

  interface IUploadProps {
    type?: UploadType;
    headers?: {
      [props: string]: string;
    };
    accept?: string;
    action?: string | ((file: File[]) => Promise);
    method?: 'post' | 'get';
    directory?: boolean;
    onChange?: IHandlerFile;
    className?: string;
    style?: CSSProperties;
    data?: {
      [props: string]: any;
    };
    withCredentials?: boolean;
    fileName?: string;
    multiple?: boolean;
    beforeUpload?: TBeforeUpload;
    disabled?: boolean;
    outterClassName?: string;
    innerClassName?: string;
    showFileList?: boolean;
    fileList?: TFileList;
    customFileList?: ReactNode;
    timeout?: number;
    customAction?: Function;
    uploadSuccess?: (res: any, file: File[] | FileList | null, fileList: TFileList) => any;
    uploadFailed?: (err: any, file: File[] | FileList | null, fileList: TFileList) => any;
    onChangeFileList?: (fileList: TFileList) => any;
    onDeleteFile?: (fileDelete?: File, index: number, fileList?: Partial<File>[] | File[] | FileList) => any;
  }
}
