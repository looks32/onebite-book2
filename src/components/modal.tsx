'use client';

import { ReactNode, useEffect, useRef } from 'react';
import style from './modal.module.css';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  return createPortal(
    <dialog
      className={style.modal}
      ref={dialogRef}
      // esc 누르면 뒤로가기
      onClose={() => router.back()}
      // 모달 배경 클릭 시 뒤로가기
      onClick={(e) => {
        if ((e.target as any).nodeName === 'DIALOG') {
          router.back();
        }
      }}
    >
      {children}
    </dialog>,
    document.getElementById('modal-root') as HTMLElement
  );
}
