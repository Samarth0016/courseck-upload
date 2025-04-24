"use client";

import { ContentState, convertFromRaw } from "draft-js";
import { convertToHTML } from "draft-convert";
import React from "react";

interface PreviewProps {
  value: string; // Serialized Editor content (JSON string)
}

export const Preview = ({ value }: PreviewProps) => {
  const contentState = value
    ? convertFromRaw(JSON.parse(value)) // Parse serialized content
    : ContentState.createFromText("No content available.");

  // Convert ContentState to HTML
  const html = convertToHTML(contentState);

  return (
    <div
      className="draft-preview"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
};
