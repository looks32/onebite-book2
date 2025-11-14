import { BookData } from '@/types';
import style from './page.module.css';
import { notFound } from 'next/navigation';

// 아래 만들어진 1,2,3 이외에는 모두
// 404 페이지로 보낸다.
// export const dynamicParams = false;

// id 1,2,3 만 정적페이지로 생성
// 1,2,3 이외의 페이지를 통해서 들어와도
// 처음엔 로드하는 시간이 걸리지만
// 정적인 페이지(html)가 만들어져서
// 추후에 들어올때는 페이지가 빠르게 로드 된다.
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`
  );

  if (!response.ok) {
    // 404 에러페이지
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } =
    books;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
