import { Link } from '@nextui-org/link';
import { button as buttonStyles } from '@nextui-org/theme';

import { title, subtitle } from '@/components/primitives';

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-2">
      <img src="/kotik.svg" alt="Informal" className="w-48 h-48" />
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Your&nbsp;</h1>
        <h1 className={title({ color: 'violet' })}>guide&nbsp;</h1>
        <br />
        <h1 className={title()}>to great finds</h1>
        <h2 className={subtitle({ class: 'mt-4' })}>
          We simplify your shopping choices by providing personalized recommendations tailored to
          your unique preferences.
        </h2>
      </div>

      <div className="flex gap-3">
        <Link
          className={`${buttonStyles({
            radius: 'full',
            variant: 'shadow',
          })} bg-sky-500 text-white`}
          href="chat"
        >
          Lets get started
        </Link>
      </div>
    </section>
  );
}
