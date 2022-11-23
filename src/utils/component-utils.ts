export function parseDate(createdAt: number) {
  return (
    new Date(createdAt).toLocaleTimeString('') +
    ' - ' +
    new Date(createdAt)
      .toLocaleDateString('', {
        day: '2-digit',
        month: 'short',
      })
      .replace(/\s/g, '/')
  );
}
