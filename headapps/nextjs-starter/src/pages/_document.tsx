import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { ALL_FONT_VARIABLES } from 'src/helpers/fonts';

export default function Document() {
  return (
    <Html className={ALL_FONT_VARIABLES}>
      <Head>
        <Script id="theme-preload" strategy="beforeInteractive">
          {`
            try {
              var saved = localStorage.getItem('theme-vars');
              if (saved) {
                var vars = JSON.parse(saved);
                for (var name in vars) {
                  if (Object.prototype.hasOwnProperty.call(vars, name)) {
                    document.documentElement.style.setProperty(name, vars[name]);
                  }
                }
              }
            } catch(e) {
              console.error('Theme preload failed', e);
            }
          `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
