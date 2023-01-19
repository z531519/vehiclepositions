
export var base:string;

export interface ConfigProps {
  base:string;
}

export function setBase(url:string) {
  base = url;
}

export function ConfigProperties():ConfigProps {  
  return {
    base: base || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
  }
}