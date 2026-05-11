'use client';

import { useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Alert,
  Paper,
  LinearProgress,
  Chip,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DescriptionIcon from '@mui/icons-material/Description';
import ClearIcon from '@mui/icons-material/Clear';
import { importFormFunctions, ImportConstants } from '@ui-module/import';
import { useImportForm } from './useImportForm';

// #region Import Form Component
const ImportForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    selectedFile,
    fileError,
    isDragOver,
    isUploading,
    onFileSelect,
    onFileDrop,
    onDragOver,
    onDragLeave,
    onUpload,
    onClear,
  } = useImportForm();

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFileSelect(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Box>
      <Paper
        onDrop={onFileDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        sx={{
          p: 6,
          border: '2px dashed',
          borderColor: isDragOver ? 'primary.main' : 'divider',
          backgroundColor: isDragOver ? 'primary.light' + '10' : 'background.paper',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          borderRadius: 2,
        }}
        onClick={() => !selectedFile && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ImportConstants.AllowedExtensions.join(',')}
          onChange={handleFileInputChange}
          style={{ display: 'none' }}
        />
        {selectedFile ? (
          <Box className="flex flex-col items-center gap-3">
            <DescriptionIcon sx={{ fontSize: 64, color: 'primary.main' }} />
            <Typography variant="h6">
              {selectedFile.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {importFormFunctions.formatFileSize(selectedFile.size)}
            </Typography>
            <Box className="flex gap-2">
              <Chip
                label={`.${selectedFile.name.split('.').pop()?.toUpperCase()}`}
                color="primary"
                size="small"
              />
            </Box>
          </Box>
        ) : (
          <Box className="flex flex-col items-center gap-3">
            <CloudUploadIcon sx={{ fontSize: 64, color: 'text.disabled' }} />
            <Typography variant="h6">
              Drag & drop your file here
            </Typography>
            <Typography variant="body2" color="text.secondary">
              or click to browse files
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Supported formats: {ImportConstants.AllowedExtensions.join(', ')} (Max {ImportConstants.MaxFileSizeMB}MB)
            </Typography>
          </Box>
        )}
      </Paper>

      {fileError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {fileError}
        </Alert>
      )}

      {isUploading && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Uploading and processing...
          </Typography>
          <LinearProgress />
        </Box>
      )}

      <Box className="flex gap-2 mt-3">
        <Button
          variant="contained"
          size="large"
          disabled={!selectedFile || isUploading || !!fileError}
          onClick={onUpload}
          startIcon={<CloudUploadIcon />}
        >
          {isUploading ? 'Importing...' : 'Import File'}
        </Button>
        {selectedFile && (
          <Button
            variant="outlined"
            size="large"
            onClick={onClear}
            startIcon={<ClearIcon />}
            disabled={isUploading}
          >
            Clear
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ImportForm;
// #endregion
