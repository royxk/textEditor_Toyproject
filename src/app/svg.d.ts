// src/svg.d.ts
declare module "*.svg" {
  const content: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  export default content;
}
