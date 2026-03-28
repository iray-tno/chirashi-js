import Link from 'next/link';
import { getAllCategories, getPostsByCategory } from '@/lib/posts';

export const metadata = {
  title: 'Categories | Chiranoura Blog',
};

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-12 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        Categories
      </h1>
      <ul className="space-y-4">
        {categories.map((category) => {
          const count = getPostsByCategory(category).length;
          return (
            <li key={category}>
              <Link
                href={`/categories/${category}`}
                className="flex items-center justify-between rounded-lg p-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                <span className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                  {category}
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {count} {count === 1 ? 'post' : 'posts'}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
