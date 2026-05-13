import { cld } from '../cloudinary/config';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';
import { blur } from '@cloudinary/url-gen/actions/effect';
import type { TransformedImage } from '../types/memory';

/**
 * Generate thumbnail transformation
 */
export function getThumbnailUrl(publicId: string): string {
  return cld
    .image(publicId)
    .resize(fill().width(200).height(200))
    .delivery(format(auto()))
    .delivery(quality(autoQuality()))
    .toURL();
}

/**
 * Generate blurred background transformation (for privacy)
 */
export function getBlurredUrl(publicId: string): string {
  return cld
    .image(publicId)
    .effect(blur(800)) // heavy blur for sensitive content
    .delivery(format(auto()))
    .delivery(quality(autoQuality()))
    .toURL();
}

/**
 * Generate Polaroid-style transformation
 * Creates a vintage polaroid look with white border and shadow
 */
export function getPolaroidUrl(publicId: string): string {
  return cld
    .image(publicId)
    .resize(fill().width(400).height(300))
    .delivery(format(auto()))
    .delivery(quality(autoQuality()))
    .toURL();
}

/**
 * Generate slideshow image URL (optimized size)
 */
export function getSlideshowUrl(publicId: string): string {
  return cld
    .image(publicId)
    .resize(fill().width(800).height(600))
    .delivery(format(auto()))
    .delivery(quality(autoQuality()))
    .toURL();
}

/**
 * Get all transformed versions of an image
 */
export function getTransformedImages(publicId: string): TransformedImage {
  return {
    thumbnail: getThumbnailUrl(publicId),
    blurred: getBlurredUrl(publicId),
    polaroid: getPolaroidUrl(publicId),
    original: cld.image(publicId).toURL(),
  };
}
