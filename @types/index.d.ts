declare namespace ReactUploadZWC {
  type THttpParams = Partial<Request & {
    async?: boolean;
    username?: string | null;
    password?: string | null;
    data: {
      [props: string]: any
    };
    file: File;
    fileName: string;
  }>;
  interface IHttp {
    (res: THttpParams): Promise;
  }
  interface IHandlerFile {
    (file: File[] | FileList | null): any;
  }
  interface IUploadProps {
    accept?: string;
    action?: string | ((file: File) => Promise);
    method?: 'post' | 'get';
    directory?: boolean;
    onChange?: IHandlerFile;
    data?: {
      [props: string]: any
    };
    fileName?: string;
    multiple?: boolean;
    beforeUpload?: ((file: File, fileList: FileList) => boolean) | Promise;
    fileList?: Object[];
    disabled?: boolean;
  }
}
