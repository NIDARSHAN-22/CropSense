/**
 * User-Safe Error Sanitization Service
 * Ensures NO technical internal stack traces, API keys, or database query strings
 * are ever exposed to the user interface.
 */

export interface SanitizedError {
  title: string;
  message: string;
  actionHint: string;
  category: 'network' | 'camera' | 'format' | 'auth' | 'system';
}

export const errorHandler = {
  /**
   * Translates any raw exception into a clean, reassuring, farmer-friendly error.
   */
  sanitize(rawError: any): SanitizedError {
    const errorString = String(rawError?.message || rawError || '').toLowerCase();

    // 1. Camera Permissions & Device Hardware
    if (
      errorString.includes('permission') ||
      errorString.includes('notallowederror') ||
      errorString.includes('devicesnotfound') ||
      errorString.includes('camera')
    ) {
      return {
        title: 'Camera Access Needed',
        message: 'Camera permission was not granted or your device camera is busy.',
        actionHint: 'Please allow camera access in browser permissions or use the "Upload from Gallery" button.',
        category: 'camera',
      };
    }

    // 2. Network & Connectivity (3G / Rural connection drops)
    if (
      errorString.includes('network') ||
      errorString.includes('fetch') ||
      errorString.includes('failed to fetch') ||
      errorString.includes('timeout') ||
      errorString.includes('aborted')
    ) {
      return {
        title: 'Weak Network Connection',
        message: 'Connection was interrupted while connecting to the diagnosis service.',
        actionHint: 'Your offline diagnostic engine is active. Please tap retry or upload a smaller photo.',
        category: 'network',
      };
    }

    // 3. File & Image Validation
    if (
      errorString.includes('image') ||
      errorString.includes('file') ||
      errorString.includes('mime') ||
      errorString.includes('format')
    ) {
      return {
        title: 'Unsupported Image File',
        message: 'The selected file could not be analyzed as a clear plant leaf image.',
        actionHint: 'Please take or choose a standard JPG, PNG, or WEBP photo with good lighting.',
        category: 'format',
      };
    }

    // 4. Authentication & OTP
    if (
      errorString.includes('otp') ||
      errorString.includes('auth') ||
      errorString.includes('token') ||
      errorString.includes('expired')
    ) {
      return {
        title: 'Verification Incomplete',
        message: 'The verification code was invalid or has expired.',
        actionHint: 'Please request a new OTP code or use the zero-cost Guest Demo Mode.',
        category: 'auth',
      };
    }

    // 5. Default General Safe Fallback (No internal leaks)
    return {
      title: 'Diagnostic Assistance Available',
      message: 'The automated analysis encountered a momentary delay.',
      actionHint: 'Please retake the photo or select your crop category to assist the neural model.',
      category: 'system',
    };
  },
};
