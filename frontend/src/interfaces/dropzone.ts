export interface DropzonePropsInterface {
  onFileUpload: (file: File) => void;
  clearFile: () => void;
  previewUrl?: string;
}
