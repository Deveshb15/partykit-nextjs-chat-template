import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-4 px-4 sm:px-6 w-full">
      <div className="pt-4 max-w-7xl m-auto text-sm text-stone-400 flex flex-row justify-between">
        <div className="flex flex-col gap-1 justify-start">
          <p>
            Built with{" "}
            <Link href="https://nextjs.org" className="underline">
              Next.js
            </Link>{" "}
            and{" "}
            <Link href="https://partykit.io" className="underline">
              PartyKit
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
