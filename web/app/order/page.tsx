import { redirect } from 'next/navigation';

export default async function Page() {
  // Redirect to locations page since we don't offer online ordering
  redirect('/locations');
}
