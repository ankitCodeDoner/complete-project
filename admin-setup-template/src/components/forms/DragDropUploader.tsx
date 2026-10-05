import { Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface DragDropUploaderProps {
  name: string;
  label?: string;
  file?: File | string;
  onChange: (file: File) => void;
}

export const DragDropUploader = ({
  name,
  label,
  file,
  onChange,
}: DragDropUploaderProps) => {
  const [preview, setPreview] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (typeof file === "string") {
      setPreview(file);
    } else if (file instanceof File) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) onChange(droppedFile);
  };

  const handleBrowse = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) onChange(e.target.files[0]);
  };

  return (
    <Box>
      {label && (
        <Typography variant="subtitle2" mb={1}>
          {label}
        </Typography>
      )}

      <Box
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={handleBrowse}
        sx={{
          border: "2px dashed #e754e7",
          borderRadius: 2,
          padding: 4,
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.2s",
          "&:hover": {
            backgroundColor: "#fafafa",
          },
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            style={{ width: "100%", height: "200px", objectFit: "contain" }}
          />
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <CloudUploadIcon sx={{ fontSize: 40, color: "#888" }} />
            <Typography variant="body2" fontWeight={500}>
              Drag & drop to upload
            </Typography>
            <Typography variant="caption" color="primary">
              or browse
            </Typography>
          </Box>
        )}
        <input
          ref={inputRef}
          type="file"
          hidden
          accept="image/*"
          name={name}
          onChange={handleFileChange}
        />
      </Box>
    </Box>
  );
};
