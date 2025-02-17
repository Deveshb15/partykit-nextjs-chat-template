import Link from "next/link";

type User = {
  username: string;
  name?: string;
  email?: string;
  image?: string;
  expires?: string;
};

export default async function Header() {
  const user = null as User | null;

  return (
    <header className="z-10 p-4 sm:p-6 w-full border-b border-stone-300 absolute sticky top-0 bg-white/80 backdrop-blur">
      <nav className="max-w-7xl m-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="font-medium my-2">🎈Starter Kit</h1>
        </Link>
        {user && (
          <div className="flex gap-2 items-center">
            <span>Hi {user?.username}!</span>
          </div>
        )}
      </nav>
    </header>
  );
}
