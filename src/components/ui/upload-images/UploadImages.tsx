import React from 'react';
import ImageUploading, { ImageListType } from "react-images-uploading";

import './upload-images.scss';
import UploadIcon from '../../../assets/images/uploadIcon.svg';

export interface UploadImagesProps {
    className?: string
    onChange?: (file: File[]) => void
}

const UploadImages = ({ className, onChange }: UploadImagesProps) => {
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;

    const handleChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
    ) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList as never[]);
        if (onChange) {
            onChange(imageList.map(i => i.file) as File[])
        }
    };
    return (
        <div className="upload-images ">
            <ImageUploading
                multiple
                value={images}
                onChange={handleChange}
                maxNumber={maxNumber}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                }) => (
                    <div className="upload__image-wrapper">
                        <div onClick={onImageUpload} className="upload-button">
                            <img src={UploadIcon} width="20" height="20" />
                            <span>Click to upload</span>
                        </div>
                        <div className='images-preview'>
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image.dataURL} alt="" />

                                    <button className='image-item--close' onClick={() => onImageRemove(index)}>X</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </ImageUploading>
        </div>
    )
}

export default React.memo(UploadImages)