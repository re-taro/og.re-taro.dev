export interface OgImageOption {
  title?: string
  domain?: string
  date?: string
}

export type OgImageOptionConverted = {
  [key in keyof OgImageOption]?: string;
};
