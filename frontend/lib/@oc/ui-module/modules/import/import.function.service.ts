import { toast } from 'react-toastify';
import { ImportConstants } from './import.schema';

// #region Import Form Functions
export const importFormFunctions = {
  validateFile: (file: File): string | null => {
    const extension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    if (!ImportConstants.AllowedExtensions.includes(extension as never)) {
      return `Invalid file type. Allowed formats: ${ImportConstants.AllowedExtensions.join(', ')}`;
    }
    if (file.size > ImportConstants.MaxFileSize) {
      return `File size exceeds ${ImportConstants.MaxFileSizeMB}MB limit.`;
    }
    return null;
  },

  handleImportSuccess: (imported: number, skipped: number) => {
    toast.success(`Import complete: ${imported} imported, ${skipped} skipped.`);
  },

  formatFileSize: (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  },
};
// #endregion
