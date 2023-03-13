import { fontLoader } from './loader';

const jbMonoFontLoader = (weight: string) =>
  fontLoader(`/assets/fonts/JetBrainsMono-${weight}.woff`);

export const jbMonoMedium = jbMonoFontLoader('Medium');
