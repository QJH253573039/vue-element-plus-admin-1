/**
 * 加载 svg
 */
export function loadSvg() {
    const requireAll = (requireContext) => requireContext.keys().map(requireContext);
    const req = require.context("@/icons/svg/", false, /\.svg$/);
    requireAll(req);
}