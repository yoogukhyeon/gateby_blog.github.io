import React, { useEffect, useRef } from 'react';

function KakaoFixedAdfit() {
  // 최초 1회만 광고를 불러오기 위한 변수
  const adRef = useRef<boolean>(false);

  useEffect(() => {
    // 로딩된 광고가 있으면, 추가 로딩 X
    if (adRef.current) {
      return;
    }

    const ins = document.createElement('ins');
    const script = document.createElement('script');

    ins.className = 'kakao_ad_area';
    ins.style.display = 'none;';

    // 윈도우 사이즈에 따라 광고 사이즈 조정(사이즈마다 해당 광고 단위 ID 적용)
    const winodwSize = window.innerWidth;
    if (winodwSize < 1024) {
      ins.setAttribute('data-ad-width', '320');
      ins.setAttribute('data-ad-height', '100');
      ins.setAttribute('data-ad-unit', 'DAN-uPE9353XSVNvzJ3a');
    } else {
      ins.setAttribute('data-ad-width', '728');
      ins.setAttribute('data-ad-height', '90');
      ins.setAttribute('data-ad-unit', 'DAN-GE8bftYGLlnPl3k5');
    }

    script.async = true;
    script.type = 'text/javascript';
    script.src = '//t1.daumcdn.net/kas/static/ba.min.js';

    document.querySelector('.div_fixed__kakaoAdFit')?.appendChild(ins);
    document.querySelector('.div_fixed__kakaoAdFit')?.appendChild(script);

    // 광고 로딩 여부 상태 변경
    adRef.current = true;
  }, []);
  return (
    <>
      <aside className="div_fixed__kakaoAdFit"></aside>
    </>
  );
}

export default React.memo(KakaoFixedAdfit);
