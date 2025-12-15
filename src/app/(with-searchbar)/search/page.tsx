import BookItem from '@/components/book-item';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';
import { BookData } from '@/types';
import { Metadata } from 'next';
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

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: `${q} : 한입 북스 검색`,
    description: `${q} : 검색 결과입니다.`,
    openGraph: {
      title: `${q} : 한입 북스 검색`,
      description: `${q} : 검색 결과입니다.`,
      images: ['/thumbnail.png'],
    }
  };
}

export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    // key 값이 바뀔때 마다 로딩보이게
    <Suspense
      key={searchParams.q || ''}
      fallback={<BookListSkeleton count={3} />}
    >
      <SearchResult q={searchParams.q || ''} />
    </Suspense>
  );
}
