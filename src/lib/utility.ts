export const zipArray = (rows: any) => rows[0].map((_: any, c: any) => rows.map((row: any) => row[c]));
