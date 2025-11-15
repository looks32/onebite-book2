'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div>
      <h3>오류가 발생했습니다.</h3>

      {/* 클라이언트만 새로 고침하기 때문에 (서버는 재실행 되지 않음) 근본적인 해결책이 될 수 없음 */}
      <button onClick={() => reset()}>다시 시도1</button>

      {/* 전체 페이지를 새로 고침시키기 때문에 클라이언트와 서버 모두 새로 고침 된다. 
        하지만 모두 새로 고침 되기 때문에 모든 설정이나 데이터를 새로 받아온다는 단점이 있음
      */}
      <button onClick={() => window.location.reload()}>다시 시도2</button>

      {/* 
        현재 페이지에서 필요한 서버 컴포넌트들을 다시 불러오고
        클라이언트를 새로고침 시킴

        reset(); 는 에러 상태를 초기화, 컴포넌트들을 다시 렌더링 시킴
      */}
      <button
        onClick={() => {
          // startTransition 를 이용해서
          // 두개의 함수가 다 끝난 경우 값을 내보내 줌
          // router.refresh(); 가 비동기이기 때문에
          // 기다려 줘야함
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
      >
        다시 시도3
      </button>
    </div>
  );
}
