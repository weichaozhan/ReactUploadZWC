declare namespace ReactUploadZWC {
  interface IUploadProps {
    accept?: string;
    action?: string| ((file: File) => Promise);
    method?: 'post' | 'get';
    directory?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any; 
  }
}
