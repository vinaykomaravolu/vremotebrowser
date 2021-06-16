import TailwindInfo from '../../../tailwind.config';

function ThemeCSS(theme: string): any {
  let t: any = {};
  if (theme in TailwindInfo.theme.extend.colors) {
    t = TailwindInfo.theme.extend.colors[theme];
  }
  return t;
}
export default ThemeCSS;
