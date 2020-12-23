declare namespace ReactUploadZWC {
  import { CSSProperties } from 'react';
  
  type THttpParams = Partial<Request & {
    async?: boolean;
    username?: string | null;
    password?: string | null;
    data: {
      [props: string]: any
    };
    file: File;
    files: File[];
    fileName: string;
    multiple: boolean;
  }>;
  interface IHttp {
    (res: THttpParams): Promise;
  }
  interface IHandlerFile {
    (file: File[] | FileList | null): any;
  }

  interface IDragger {
    height?: number;
    width?: number;
  }

  interface IUploadProps {
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
    fileName?: string;
    multiple?: boolean;
    beforeUpload?: (files: FileList | File[] | null) => (boolean | Promise<any>);
    uploadSuccess?: (...rest: any[]) => any;
    uploadFailed?: (...rest: any[]) => any;
    fileList?: Object[];
    disabled?: boolean;
    outterClassName?: string;
    innerClassName?: string;
  }
}
