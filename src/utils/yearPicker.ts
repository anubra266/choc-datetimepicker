export const createRange = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export function splitArrayIntoChunksOfLen(arr: number[], len: number) {
  var chunks = [],
    i = 0,
    n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
}

export const createYearGroups = (
  startYear: number,
  endYear: number,
  numberOfGroups: number
) => {
  if (startYear >= endYear) throw new Error("StartYear must be before EndYear");

  const years = createRange(startYear, endYear, 1);
  const yearPerGroup = years.length / numberOfGroups;
  const yearGroups = splitArrayIntoChunksOfLen(years, yearPerGroup);
  return yearGroups;
};

export const getYearGroupLabel = (yearGroup: number[]) =>
  `${yearGroup[0]}-${yearGroup[yearGroup.length - 1]}`;
