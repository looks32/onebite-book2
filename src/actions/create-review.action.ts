'use server';

import { revalidatePath } from 'next/cache';

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  // 빈 입력 방지
  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    // res 상태 표시
    // console.log(response.status);

    // Next 서버에게 경로에 해당하는 페이지를
    // 다시 생성 (재검증) 하는 함수
    // 오직 서버에서만 가능 (클라이언트 컴포넌트에서는 불가능)
    // 해당하는 페이지의 모든 캐시 무효화되니 주의
    // 풀 라우트 캐시는 무효화(삭제) 되지만 새로 추가는 되지 않음

    // 다음에 다시 방문할때 새로 만들어지고
    // 풀 라우트 캐시도 생성됨.
    revalidatePath(`/book/${bookId}`);
  } catch (err) {
    console.log(err);
  }
}
