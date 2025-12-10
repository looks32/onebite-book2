import BookPage from '@/app/book/[id]/page';
import Modal from '@/components/modal';

export default function page(props: any) {
  return (
    <div>
      가로 채기 성공
      <Modal>
        <BookPage {...props} />
      </Modal>
    </div>
  );
}
