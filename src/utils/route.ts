import { Location } from "@/types";

export const navigateLocate = (location: Location) => {
    /* 현재 네이버 지도 앱을 이용하지 않고 새탭을 열어서 사용 */
    const { px: dLongitude, py: dLatitude, name: dName } = location;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const sLatitude = pos.coords.latitude;
        const sLongitude = pos.coords.longitude;
        const url = `https://map.naver.com/p/directions/${sLongitude},${sLatitude},내위치/${dLongitude},${dLatitude},${encodeURIComponent(dName)}/-/walk`;
        window.open(url, '_blank');
      },
      () => {
        const url = `https://map.naver.com/p/directions/-,,/${dLongitude},${dLatitude},${encodeURIComponent(dName)}/-/walk`;
        window.open(url, '_blank');
      },
    );
};