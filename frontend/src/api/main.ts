export async function fetchServerStatus(): Promise<string> {
  const res = await fetch('/api/main')
  if (!res.ok) throw new Error('서버 오프라인')
  return res.text()
}
