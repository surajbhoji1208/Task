// #region Import Constants
export const ImportConstants = {
  MaxFileSize: 10 * 1024 * 1024,
  MaxFileSizeMB: 10,
  AllowedExtensions: ['.csv', '.xls', '.xlsx'] as const,
  AllowedMimeTypes: [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ] as const,
  DefaultPageSize: 10,
  StaleTime: 30 * 1000,
} as const;
// #endregion
