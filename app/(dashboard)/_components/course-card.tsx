import React from "react";

interface CourseCardProps {
    title: string;
    category: string;
    chapters: number;
    progress: number;
    image: string;
}

const CourseCard = ({ title, category, chapters, progress, image }:CourseCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-72 ">
      <img src={image} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-md font-semibold">{title}</h3>
        <p className="text-gray-500 text-sm">{category}</p>
        <p className="text-sm mt-2">📘 {chapters} Chapters</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
          <div
            className="bg-green-500 text-sm h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">{progress}% Complete</p>
      </div>
    </div>
  );
};

export default CourseCard;