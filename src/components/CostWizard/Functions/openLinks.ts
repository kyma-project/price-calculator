import config from '../../../config.json';

interface Config {
  [key: string]: string;
  }
  
function getUrlByKey(key: string, config: Config): string | undefined {
return config[key];
}
export default function openLinks(key: string) {

  const url = getUrlByKey(key, config.documentationUrls);
    window.open(url, '_blank', 'noopener,noreferrer');
}
