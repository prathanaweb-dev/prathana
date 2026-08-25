/**
 * Utility functions for document & PDF previewing and embedding
 * Specially designed to handle Google Drive, Dropbox, Cloudinary, OneDrive, and raw PDF links.
 */

export interface FormattedDocInfo {
  embedUrl: string;
  directUrl: string;
  isGoogleDrive: boolean;
  isPdf: boolean;
  fileId?: string;
}

/**
 * Extracts Google Drive file ID from various URL formats
 */
export function extractGoogleDriveId(url: string): string | null {
  if (!url) return null;
  
  // Format: /file/d/ID/...
  const fileDMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch && fileDMatch[1]) return fileDMatch[1];

  // Format: id=ID
  const idParamMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) return idParamMatch[1];

  // Format: /document/d/ID/ or /spreadsheets/d/ID/ or /presentation/d/ID/
  const docsMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (docsMatch && docsMatch[1]) return docsMatch[1];

  return null;
}

/**
 * Transforms any document URL (Google Drive, Dropbox, Web PDF) into an embeddable preview URL
 */
export function getEmbeddableDocumentInfo(rawUrl: string): FormattedDocInfo {
  if (!rawUrl) {
    return {
      embedUrl: '',
      directUrl: '',
      isGoogleDrive: false,
      isPdf: false,
    };
  }

  const trimmed = rawUrl.trim();
  const lower = trimmed.toLowerCase();

  // 1. Google Drive Links
  if (lower.includes('drive.google.com') || lower.includes('docs.google.com')) {
    const fileId = extractGoogleDriveId(trimmed);
    if (fileId) {
      return {
        embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
        directUrl: `https://drive.google.com/uc?export=download&id=${fileId}`,
        isGoogleDrive: true,
        isPdf: true,
        fileId,
      };
    }
  }

  // 2. Dropbox links
  if (lower.includes('dropbox.com')) {
    const directDropbox = trimmed.replace('?dl=0', '?raw=1').replace('&dl=0', '&raw=1');
    return {
      embedUrl: `https://docs.google.com/viewer?url=${encodeURIComponent(directDropbox)}&embedded=true`,
      directUrl: directDropbox,
      isGoogleDrive: false,
      isPdf: lower.includes('.pdf'),
    };
  }

  // 3. OneDrive links
  if (lower.includes('onedrive.live.com') || lower.includes('1drv.ms')) {
    return {
      embedUrl: trimmed.replace('/view.aspx', '/embed.aspx'),
      directUrl: trimmed,
      isGoogleDrive: false,
      isPdf: lower.includes('.pdf'),
    };
  }

  // 4. Standard Direct PDF or Cloudinary or HTTPS Document Link
  const isPdf = lower.includes('.pdf');
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(trimmed)}&embedded=true`;

  return {
    embedUrl: googleViewerUrl,
    directUrl: trimmed,
    isGoogleDrive: false,
    isPdf,
  };
}
