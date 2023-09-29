import React, { useEffect, useRef } from 'react';

function TenpingBottom() {
  // 최초 1회만 광고를 불러오기 위한 변수
  const adRef = useRef<boolean>(false);

  useEffect(() => {
    // 로딩된 광고가 있으면, 추가 로딩 X
    if (adRef.current) {
      return;
    }

    const ins = document.createElement('tenping');
    const script = document.createElement('script');

    ins.className = 'adsbytenping';
    //ins.style.display = 'none;';
    ins.setAttribute('style', 'width: 100%; margin: 0px auto; display: block; max-width: 768px;');

    // 윈도우 사이즈에 따라 광고 사이즈 조정(사이즈마다 해당 광고 단위 ID 적용)
    ins.setAttribute('tenping-ad-client', 'DgNTPgnQ%2fP73%2f%2fW2yTL1DSD1bw3h0ihw0vphY3o0QT%2bst5R2vPnxxrxC0Jqr6Ebq');
    ins.setAttribute('tenping-ad-display-type', '1LawCE8FqKOhetXZhMopsQ%3d%3d');

    script.async = true;
    //script.type = 'text/javascript';
    script.src = '//ads.tenping.kr/scripts/adsbytenping.min.js';

    document.querySelector('.div_top__bottom')?.appendChild(ins);
    document.querySelector('.div_top__bottom')?.appendChild(script);

    // 광고 로딩 여부 상태 변경
    adRef.current = true;
  }, []);
  return (
    <>
      <aside className="div_top__bottom"></aside>
    </>
  );
}

export default React.memo(TenpingBottom);
