import presetWind4 from '@unocss/preset-wind4'
import presetWebFonts from '@unocss/preset-web-fonts'
import { defineConfig, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons(),
    presetWebFonts({ 
      provider: 'google',
      fonts: {
        sans: 'Roboto',
      },
    }),
  ]
})