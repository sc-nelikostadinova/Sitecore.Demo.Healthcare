import {
  Mulish,
  Noto_Sans,
  Roboto,
  Inter,
  Poppins,
  Merriweather,
  Playfair_Display,
  Lora,
  Roboto_Slab,
  Oswald,
  Pacifico,
  Abril_Fatface,
  Righteous,
  Fira_Code,
  Source_Code_Pro,
  JetBrains_Mono,
  Dancing_Script,
  Great_Vibes,
  Caveat,
} from 'next/font/google';

// Top-level font loaders
export const mulish = Mulish({
  weight: ['400', '700'],
  variable: '--font-mulish',
  subsets: ['latin'],
  display: 'swap',
});
export const noto = Noto_Sans({
  weight: ['400', '700'],
  variable: '--font-noto',
  subsets: ['latin'],
  display: 'swap',
});
export const roboto = Roboto({
  weight: ['400', '700'],
  variable: '--font-roboto',
  subsets: ['latin'],
  display: 'swap',
});
export const inter = Inter({
  weight: ['400', '700'],
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});
export const poppins = Poppins({
  weight: ['400', '700'],
  variable: '--font-poppins',
  subsets: ['latin'],
  display: 'swap',
});
export const oswald = Oswald({
  weight: ['400', '700'],
  variable: '--font-oswald',
  subsets: ['latin'],
  display: 'swap',
});

export const playfair = Playfair_Display({
  weight: ['400', '700'],
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});
export const lora = Lora({
  weight: ['400', '700'],
  variable: '--font-lora',
  subsets: ['latin'],
  display: 'swap',
});
export const merriweather = Merriweather({
  weight: ['400', '700'],
  variable: '--font-merriweather',
  subsets: ['latin'],
  display: 'swap',
});
export const roboto_slab = Roboto_Slab({
  weight: ['400', '700'],
  variable: '--font-roboto_slab',
  subsets: ['latin'],
  display: 'swap',
});

export const abril = Abril_Fatface({
  weight: ['400'],
  variable: '--font-abril',
  subsets: ['latin'],
  display: 'swap',
});
export const righteous = Righteous({
  weight: ['400'],
  variable: '--font-righteous',
  subsets: ['latin'],
  display: 'swap',
});
export const pacifico = Pacifico({
  weight: ['400'],
  variable: '--font-pacifico',
  subsets: ['latin'],
  display: 'swap',
});

export const fira = Fira_Code({
  weight: ['400', '700'],
  variable: '--font-fira',
  subsets: ['latin'],
  display: 'swap',
});
export const source = Source_Code_Pro({
  weight: ['400', '700'],
  variable: '--font-source',
  subsets: ['latin'],
  display: 'swap',
});
export const jetbrains = JetBrains_Mono({
  weight: ['400', '700'],
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
});

export const dancing = Dancing_Script({
  weight: ['400', '700'],
  variable: '--font-dancing',
  subsets: ['latin'],
  display: 'swap',
});
export const great = Great_Vibes({
  weight: ['400'],
  variable: '--font-great',
  subsets: ['latin'],
  display: 'swap',
});
export const caveat = Caveat({
  weight: ['400', '700'],
  variable: '--font-caveat',
  subsets: ['latin'],
  display: 'swap',
});

const fontsByCategory = {
  'Sans Serif': { mulish, noto, roboto, inter, poppins, oswald },
  Serif: { playfair, lora, merriweather, roboto_slab },
  Display: { abril, righteous, pacifico },
  Monospace: { fira, source, jetbrains },
  Handwriting: { dancing, great, caveat },
};

function generateFontGroups(
  fontsByCategory: Record<string, Record<string, { style: { fontFamily: string } }>>
) {
  return Object.fromEntries(
    Object.entries(fontsByCategory).map(([category, fonts]) => {
      const fontList = Object.entries(fonts)
        .map(([key, fontObj]) => {
          const label = key
            .split('_')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');

          return {
            label,
            // value: `var(--font-${key})`,
            value: `${fontObj.style.fontFamily}`,
          };
        })
        .sort((a, b) => a.label.localeCompare(b.label));

      return [category, fontList];
    })
  );
}

export const FONT_GROUPS = generateFontGroups(fontsByCategory);
export const ALL_FONT_VALUES = Object.values(FONT_GROUPS).flatMap((arr) => arr.map((o) => o.value));
export const ALL_FONT_VARIABLES = Object.values(fontsByCategory)
  .flatMap((group) => Object.values(group))
  .map((font) => font.variable)
  .join(' ');
