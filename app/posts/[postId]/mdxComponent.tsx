import type { MDXComponents } from "mdx/types";

import Link from "next/link";
import Image from "next/image";

// issue : JSX를 기반으로 하다 보니 <= 를 {'<='}로 치환해줘야 읽을 수 있다.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    a: ({ children, ...props }) => (
      <Link href={props.href || ""}>{children}</Link>
    ),
    img: ({ src, alt }) => <Image src={src || ""} alt={alt || "no info"} />,
    ...components,
  };
}
