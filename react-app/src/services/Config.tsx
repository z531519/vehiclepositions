
export interface ConfigProps {
  base:string;
}

export function ConfigProps():ConfigProps {
  return {
    base: process.env.API_URL || "http://localhost:8080"
  }
}