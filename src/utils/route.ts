import { Store } from "@/types";

export const navigateLocate = (location: Store) => {
    const { longitude: dLongitude, latitude: dLatitude, name: dName } = location;
    /* 모바일 환경일 경우 CHECK - (User-Agent 문자열 검사 방식) */
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      // intent URL 이라 앱이 설치되지 않은 경우 구글 플레이 스토어로 이동
      const appUrl = `nmap://route/public?sname=${encodeURIComponent("내위치")}&dlat=${dLatitude}&dlng=${dLongitude}&dname=${encodeURIComponent(dName)}&appname=ondo`
      
      /* 
      모바일 웹 상에서 길찾기 하는 방법
      const sName = encodeURIComponent("내위치");
      const weburl = `https://m.map.naver.com/route.nhn?menu=route&sname=${sName}&ename=${dName}&ex=${dLongitude}&ey=${dLatitude}&pathType=3`;
      */
      
      window.location.href = appUrl;
    } else {
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
    }
};