"use client";

import { useState } from "react";

function ArticleImage({ url, alt }: { url: string | null; alt: string }) {

    const [imgSrc, setImgSrc] = useState(url || "/blog-fallback.png");

    const handleImageError = () => {
        setImgSrc("/blog-fallback.png");
    };

    return (
        <div className="relative aspect-video overflow-hidden">
            <img
                src={imgSrc}
                alt={alt}
                // sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-103 aspect-video"
                onError={handleImageError}
            />
        </div>
    );
}

export default ArticleImage;
