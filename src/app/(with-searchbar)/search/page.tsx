export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  // 쿼리 받아와서 사용하기
  const { q } = await searchParams;
  return <div>search {q}</div>;
}
