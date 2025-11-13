import { ReactNode, Suspense } from 'react';
import Searchbar from '../../components/searchbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      {/* 오직 클라이언트 측에서만 실행되도록 만듬 (사전 렌더링에서 배제됨) */}
      {/* searchbar안의 비동기 작업이 끝날때 까지 loading을 보여줌 */}
      <Suspense fallback={<div>Loading....</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
