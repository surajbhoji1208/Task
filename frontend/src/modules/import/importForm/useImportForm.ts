'use client';

import { useState, useCallback } from 'react';
import { useImportProducts, importFormFunctions, ImportConstants } from '@ui-module/import';
import { toast } from 'react-toastify';

// #region Use Import Form Hook
export interface UseImportFormReturn {
  selectedFile: File | null;
  fileError: string | null;
  isDragOver: boolean;
  isUploading: boolean;
  onFileSelect: (file: File) => void;
  onFileDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onUpload: () => Promise<void>;
  onClear: () => void;
}

export const useImportForm = (): UseImportFormReturn => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const importMutation = useImportProducts();

  const validateAndSetFile = useCallback((file: File) => {
    const error = importFormFunctions.validateFile(file);
    if (error) {
      setFileError(error);
      setSelectedFile(null);
    } else {
      setFileError(null);
      setSelectedFile(file);
    }
  }, []);

  const onFileSelect = useCallback(
    (file: File) => {
      validateAndSetFile(file);
    },
    [validateAndSetFile]
  );

  const onFileDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) validateAndSetFile(file);
    },
    [validateAndSetFile]
  );

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const onUpload = useCallback(async () => {
    if (!selectedFile) {
      toast.error('Please select a file to import.');
      return;
    }
    try {
      const response = await importMutation.mutateAsync(selectedFile);
      if (response.data) {
        importFormFunctions.handleImportSuccess(
          response.data.importedRecords,
          response.data.skippedRecords
        );
        setSelectedFile(null);
      }
    } catch {
      // Error handled in mutation hook
    }
  }, [selectedFile, importMutation]);

  const onClear = useCallback(() => {
    setSelectedFile(null);
    setFileError(null);
  }, []);

  return {
    selectedFile,
    fileError,
    isDragOver,
    isUploading: importMutation.isPending,
    onFileSelect,
    onFileDrop,
    onDragOver,
    onDragLeave,
    onUpload,
    onClear,
  };
};
// #endregion
