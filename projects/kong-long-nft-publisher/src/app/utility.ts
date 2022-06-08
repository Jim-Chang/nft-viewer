import { Observable } from 'rxjs';

export function readFileAsDataUrl$(file: File): Observable<string> {
  return new Observable<string>((observer) => {
    const reader = new FileReader();
    reader.onload = () => {
      observer.next(reader.result as string);
      observer.complete();
    };
    reader.readAsDataURL(file);
  });
}
