import { ReactNode } from 'react';

export default function Container({ children }: { children: ReactNode }) {
  return <main className="mx-auto flex h-screen max-w-lg flex-col bg-[#eeeeee] p-3">{children}</main>;
}
