import React, { useRef, useState } from 'react';
import UploadIcon from '../../../assets/images/uploadIcon.svg';
import './upload-videos.scss';

export interface UploadVideosProps {
    className?: string
    width?: number
    height?: number,
    onChange?: (file: File[]) => void
}

const UploadVideos = ({
    className,
    width = 200,
    height = 200,
    onChange
}: UploadVideosProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [sources, setSources] = useState<Array<string>>();

    const handleFileChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (event && event.target) {
            const target = event.target as HTMLInputElement
            const files = target?.files || [];
            if (files.length <= 0) {
                return
            }
            let sourceList = (sources && sources.length > 0) ? [...sources] : []
            for (const file of files) {
                sourceList.push(URL.createObjectURL(file))
            }
            setSources(sourceList);
            if (onChange) {
                onChange(files as File[])
            }
        }
    };

    const onRemove = (source: string) => {
        const newSources = sources?.filter((s: string) => s !== source);
        setSources(newSources)
    }

    const onVideoUpload = () => {
        inputRef.current?.click();
    };

    return (
        <div className={className}>
            <input
                ref={inputRef}
                className="video-input"
                type="file"
                onChange={handleFileChange}
                accept=".mov,.mp4"
                hidden
                multiple
            />
            <div onClick={onVideoUpload} className="upload-video-button">
                <img src={UploadIcon} width="20" height="20" />
                <span>Click to upload</span>
            </div>
            {sources && sources?.length > 0 && (
                <div className='video-items'>
                    {sources.map((source) => (
                        <div key={source} className="video-item" style={{ width: `${width}px`, height: `${height}px` }}>
                            <video
                                controls
                                height="100%"
                                src={source}
                                width="100%"
                            />
                            <button className='video-item--close' onClick={() => onRemove(source)}>X</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default React.memo(UploadVideos)