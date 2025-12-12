import BookPage from '@/app/book/[id]/page';
import Modal from '@/components/modal';

export default function page(props: any) {
  return (
    <Modal>
      <BookPage {...props} />
    </Modal>
  );
}
