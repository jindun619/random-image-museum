export function MiniLink({ href, text }: { href: string; text: string }) {
  return (
    <a
      href={href}
      className="text-xs text-gray-600 hover:underline hover:text-blue-600">
      {text}
    </a>
  );
}
