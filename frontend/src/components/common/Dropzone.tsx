import { makeStyles, Button } from '@material-ui/core'
import React, { useRef, useState } from 'react'
import Dropzone from 'react-dropzone'
import { DropzonePropsInterface } from '../../interfaces/dropzone'

const useStyles = makeStyles((_theme) => ({
  uploadSection: {
    display: 'flex',
    height: '200px',
    marginBottom: '10px',
    "@media screen and (max-width: 1000px)": {
      flexDirection: 'column',
      height: 'unset'
    }
  },
  dropZone: {
    marginBottom: '10px',
    padding: '40px 10px',
    height: 'inherit',
    border: '2px dashed #e9ebeb',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    "@media screen and (max-width: 600px)": {
      height: '100%'
    }
  },
  imagePreview: {
    height: 'inherit',
    marginLeft: '5%',
    "@media screen and (max-width: 1000px)": {
      marginLeft: 0,
      height: '300px'
    }
  },
  previewImage: {
    width: '100%',
    height: 'inherit',
    display: 'block',
    marginBottom: '10px',
  },
  previewMessage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5%'
  },
  filesContainer: {
    width: '98%',
    overflowX: 'auto'
  },
  removeButton: {
    textAlign: 'center'
  }
}))

export default function CustomDropzone({ onFileUpload, clearFile }: DropzonePropsInterface): JSX.Element {
  const classes = useStyles()
  const [file, setFile] = useState(null as unknown as File)
  const [previewSrc, setPreviewSrc] = useState('')
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false)
  const dropRef = useRef()

  const onDrop = (files: File[]) => {
    const [uploadedFile] = files
    onFileUpload(uploadedFile)
    setFile(uploadedFile)
    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result as string)
    }
    if (uploadedFile instanceof Blob) {
      fileReader.readAsDataURL(uploadedFile)
      setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/) as any)
    }
  }

  const updateBorder = (dragState: string) => {
    if (dropRef.current !== undefined) {
      if (dragState === 'over') {
        (dropRef.current as any).style.border = '2px solid #000';
      } else if (dragState === 'leave') {
        (dropRef.current as any).style.border = '2px dashed #e9ebeb';
      }
    }
  }

  const removeFile = () => {
    clearFile()
    setFile(null as unknown as File)
    setPreviewSrc('')
  }

  return (
    <>
      <div className={classes.uploadSection}>
        <Dropzone
          onDrop={onDrop}
          accept={['image/jpeg', 'image/png']}
          maxFiles={1}
          onDragEnter={() => updateBorder('over')}
          onDragLeave={() => updateBorder('leave')}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps({ className: classes.dropZone })} ref={dropRef as any}>
              <input {...getInputProps()} />
              <p>Drag and drop OR click to upload an image</p>
              {file && (
                <div>
                  <strong>Selected image:</strong> {file && file.name}
                </div>
              )}
            </div>
          )}
        </Dropzone>
        {previewSrc ? (
          isPreviewAvailable ? (
            <div className={classes.imagePreview}>
              <img className={classes.previewImage} src={previewSrc} alt="Preview" />
            </div>
          ) : (
              <div className={classes.previewMessage}>
                <p>No preview is available for this image</p>
              </div>
            )
        ) : (
            <div className={classes.previewMessage}>
              <p>Image preview will be shown here after selection</p>
            </div>
          )}
      </div>
      {
        file &&
        <div className={classes.removeButton}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => { removeFile() }}
          >Remove Image</Button>
        </div>
      }
    </>
  )
}
