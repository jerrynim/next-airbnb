declare module "googlemaps";

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}
