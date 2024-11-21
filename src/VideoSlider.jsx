import React, { useState } from "react";
import DriveVideoEmbed from "./DriveVideoEmbed.jsx";
import { useMediaQuery } from "react-responsive";

function VideoSlider({ videoList }) {
    const isDesktop = useMediaQuery({ query: "(min-width: 801px)" });
    const visibleVideos = isDesktop ? 4 : 2;
    const [initialId, setInitialId] = useState(0);

    const getDisplayVideos = (startIndex) => {
        const videos = [];
        for (let i = 0; i < visibleVideos; i++) {
            const video = videoList[(startIndex + i) % videoList.length];
            if (video && video.id !== undefined && !videos.some((v) => v.id === video.id)) {
                videos.push(video);
            } else {
                console.error("Invalid video object:", video);
            }
        }
        return videos;
    };

    const handleNext = () => {
        setInitialId((prevId) => (prevId + visibleVideos) % videoList.length);
    };

    const handlePrev = () => {
        setInitialId((prevId) => (prevId - visibleVideos + videoList.length) % videoList.length);
    };

    if (!Array.isArray(videoList)) {
        console.error("Invalid or empty videoList:", videoList);
        return null;
    }

    if (videoList.length === 0) {
        return <p className="no-videos-message">No videos match your search.</p>;
    }

    const displayVideos = getDisplayVideos(initialId);

    return (
        <div className="video-slider">
            <div className="arrows-videos-container">
                {videoList.length > visibleVideos && (
                    <button className="arrows" onClick={handlePrev}>
                        &#10094;
                    </button>
                )}

                <div className="videos-container">
                    {displayVideos.map((video) => (
                        <div key={video.id} className="video-item">
                            <DriveVideoEmbed
                                videoUrl={video.videoUrl}
                                vertical={video.vertical}
                                title={video.title}
                                subtitle={video.subtitle}
                            />
                            <h3>{video.title}</h3>
                            <p>{video.subtitle}</p>
                        </div>
                    ))}
                </div>

                {videoList.length > visibleVideos && (
                    <button className="arrows" onClick={handleNext}>
                        &#10095;
                    </button>
                )}
            </div>

            <div className="dots-container">
                {Array.from({ length: videoList.length }, (_, i) => (
                    <span
                        key={i}
                        className={`dot ${displayVideos.some((v) => v.id === i) ? "active" : ""}`}
                        onClick={() => setInitialId(i)}
                    ></span>
                ))}
            </div>
        </div>
    );
}


export default VideoSlider;