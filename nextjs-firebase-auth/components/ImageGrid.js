import React, { useEffect } from "react";
import Photographer from "./Photographer";

function ImageGrid({ currentItems }) {
  const images = [
    { id: 1, images: { fixed_height: { url: "https://cdn.builder.io/api/v1/image/assets/TEMP/e2e1b11b2dbd74dbe36ec581aa821255761df7ca8d32254938b82aef67855135?placeholderIfAbsent=true&apiKey=63218c96fdb74c5ea56c11d25663b8b5" } }, slug: "Street photography image 1" },
    { id: 2, images: { fixed_height: { url: "https://cdn.builder.io/api/v1/image/assets/TEMP/e2e1b11b2dbd74dbe36ec581aa821255761df7ca8d32254938b82aef67855135?placeholderIfAbsent=true&apiKey=63218c96fdb74c5ea56c11d25663b8b5" } }, slug: "Street photography image 1" },
    { id: 3, images: { fixed_height: { url: "https://cdn.builder.io/api/v1/image/assets/TEMP/e2e1b11b2dbd74dbe36ec581aa821255761df7ca8d32254938b82aef67855135?placeholderIfAbsent=true&apiKey=63218c96fdb74c5ea56c11d25663b8b5" } }, slug: "Street photography image 1" }
  ];

  useEffect(() => {
    console.log("currentItems", currentItems);
  }, [currentItems]);

  return (
    <div className="flex flex-row justify-center gap-2 max-md:flex-col">
      {currentItems.map(item => (
        <div key={item.id} className="flex flex-col w-[354px] h-[323px]">
          <img src={item.images.original.url} alt={item.slug} className="w-full h-[236px] rounded-xl object-fill	" />
          <div className="flex flex-wrap gap-5 justify-between mt-7 w-full leading-none">
            <Photographer name={item.user?.display_name ? item.user.display_name : item.username} username={item.username} is_verified={item.user?.is_verified} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ImageGrid;
