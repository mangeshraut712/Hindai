/**
 * Next 15 static export often emits `/logo.webp` and `/manifest.json`
 * without `basePath`. Rewrite those public-root URLs for GitHub Pages.
 */

const MEDIA_EXT = String.raw`(?:webp|png|jpg|jpeg|gif|svg|ico|avif|mp3|mp4|pdf)`;
const PUBLIC_FILES = String.raw`(?:strip-injected-dom-attrs\.js|manifest\.json|sw\.js|llms\.txt|llms-full\.txt)`;

function prefixPublicAssetContent(content, basePath, includeQuoted) {
  const escapedBase = basePath.slice(1);
  const attrPattern = new RegExp(
    String.raw`(src|srcSet|poster|href)=("|')(\/(?!${escapedBase}\/)(?!_next\/)(?:[^"'?]*\.${MEDIA_EXT}|${PUBLIC_FILES}))(\?[^"']*)?\2`,
    "g"
  );
  const quotedPattern = new RegExp(
    String.raw`("|')(\/(?!${escapedBase}\/)(?!_next\/)(?!api\/)(?:[^"'?\s]*\.${MEDIA_EXT}|${PUBLIC_FILES}))(\?[^"']*)?\1`,
    "g"
  );

  let next = content.replace(attrPattern, (_m, attr, quote, assetPath, query = "") => {
    return `${attr}=${quote}${basePath}${assetPath}${query}${quote}`;
  });
  if (includeQuoted) {
    next = next.replace(quotedPattern, (_m, quote, assetPath, query = "") => {
      return `${quote}${basePath}${assetPath}${query}${quote}`;
    });
  }
  return next;
}

module.exports = { prefixPublicAssetContent, MEDIA_EXT, PUBLIC_FILES };
