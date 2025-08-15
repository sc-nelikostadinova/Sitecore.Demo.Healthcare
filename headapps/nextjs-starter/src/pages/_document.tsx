import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('theme-vars');
                  if (!saved) return;
                  var vars = JSON.parse(saved);
                  for (var name in vars) {
                    if (vars.hasOwnProperty(name)) {
                      document.documentElement.style.setProperty(name, vars[name]);
                    }
                  }
                } catch(e) {
                  console.error('Theme preload failed', e);
                }
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
