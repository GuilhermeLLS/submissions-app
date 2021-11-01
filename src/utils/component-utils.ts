export function parseDate(createdAt: number) {
  return (
    new Date(createdAt).toLocaleTimeString('en-US') +
    ' - ' +
    new Date(createdAt)
      .toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
      })
      .replace(/\s/g, '/')
  );
}
