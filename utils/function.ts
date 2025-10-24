export function updateData<T extends Record<string, any>>(
  data: T,
  newData: Partial<T>
): T {
  return {
    ...data,
    ...newData,
  };
}
