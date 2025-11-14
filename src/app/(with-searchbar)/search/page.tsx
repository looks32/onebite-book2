import BookItem from '@/components/book-item';
import { BookData } from '@/types';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_SERVER_URL
    }/book/search?q=${encodeURIComponent(q)}`,

    // searchParams 를 사용하기 때문에 스테틱 페이지로 만들 수 없지만
    // 캐시를 저장시킴으로서 페칭을 조금 더 빠르게 로드 가능
    { cache: 'force-cache' }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
