'use client';

import { useActionState, useEffect, useRef } from 'react';
import { deleteReviewAction } from './delete-review-action';

export default function ReviewItemDeleteButton({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <>
      {/* submit이 아닌 requestSubmit인 이유는 
        submit는 무조건 서버에 강제로 데이터를 보내버림
        그래서 비교적 안전한 requestSubmit을 사용함.
      */}
      <form ref={formRef} action={formAction}>
        <input name="reviewId" value={reviewId} hidden readOnly />
        <input name="bookId" value={bookId} hidden readOnly />
        {isPending ? (
          <div>...</div>
        ) : (
          <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
        )}
      </form>
    </>
  );
}
