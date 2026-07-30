/**
 * src/components/JsonLd.tsx
 * -------------------------
 * Renders a schema.org object as a JSON-LD script tag.
 *
 * Replaces the inline `<script dangerouslySetInnerHTML={{ __html: JSON.stringify(x) }} />`
 * pattern that was repeated in app/page.tsx and app/blog/[slug]/page.tsx.
 *
 * Two improvements over the inline version:
 *   • escapes "<" so a stray "</script>" inside any string value cannot break out
 *   • returns null for null/undefined input, so you can pass a builder result
 *     straight in without guarding at every call site
 */

type JsonLdProps = {
  data: unknown;
  id?: string;
};

export default function JsonLd({ data, id }: JsonLdProps) {
  if (!data) return null;

  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
