const postcss = require('postcss');

module.exports = postcss.plugin('postcss-mobile-desktop', () => {
  return (root) => {
    root.walkDecls(decl => {
      if (decl.value.includes('mobile-desktop(')) {
        const match = decl.value.slice(15, - 1).split("=")
        if (match && match.length >= 2) {
          const mobileValue = match[0].trim();
          const desktopValue = match[1].trim();

          // Create at-rule for mobile
          const mobileRule = postcss.atRule({
            name: 'media',
            params: `(max-width: $mantine-breakpoint-md)`
          });
          const mobileDecl = decl.clone({ value: mobileValue });
          mobileRule.append(mobileDecl);

          // Create at-rule for desktop
          const desktopRule = postcss.atRule({
            name: 'media',
            params: `(min-width: $mantine-breakpoint-md)`
          });
          const desktopDecl = decl.clone({ value: desktopValue });
          desktopRule.append(desktopDecl);

          // Insert the new rules before the original declaration
          decl.before(mobileRule);
          decl.before(desktopRule);

          // Remove the original declaration
          decl.remove();
        }
      }
    });
  };
});
