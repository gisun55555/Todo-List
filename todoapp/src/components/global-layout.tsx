import { ReactNode } from 'react';
import style from './global-layout.module.css';
import Link from 'next/link';
import Image from 'next/image';
export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href={'/'}>
          <div className={style.logo_container}>
            <Image
              src="/images/logo.svg"
              alt="My SVG Image"
              width={53}
              height={30}
            />
            <div className={style.logo_text}>do it ;</div>
          </div>
        </Link>
      </header>

      <main className={style.main}>{children}</main>
      {/* <footer>2</footer> */}
    </div>
  );
}
