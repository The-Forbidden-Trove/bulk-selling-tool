// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    fontS: string;
    fontL: string;
    fontM: string;

    colors: {
      fg: string;
      bg: string;
      fg2: string;
      accent: string;
      accent2: string;
      text: string;
    };
  }
}
