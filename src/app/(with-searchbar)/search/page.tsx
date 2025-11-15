import BookItem from '@/components/book-item';
import { BookData } from '@/types';
import { Suspense } from 'react';

async function SearchResult({ q }: { q: string }) {
  // 강제 로딩
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,

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

export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    // key 값이 바뀔때 마다 로딩보이게
    <Suspense key={searchParams.q || ''} fallback={<div>loading...</div>}>
      <SearchResult q={searchParams.q || ''} />
    </Suspense>
  );
}
