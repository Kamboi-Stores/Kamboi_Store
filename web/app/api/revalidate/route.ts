import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const sent = new URL(req.url).searchParams.get('secret');
  if (!secret || sent !== secret) {
    return NextResponse.json({ revalidated: false, message: 'Invalid secret' }, { status: 401 });
  }
  try {
    // Revalidate key routes
    // @ts-ignore
    await Promise.all([
      '','/menu','/order','/locations','/about','/contact','/privacy','/terms','/cookies'
    ].map(p => p || '/').map(path => import('next/cache').then(m => m.revalidatePath(path))));
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (e:any) {
    return NextResponse.json({ revalidated: false, message: e.message }, { status: 500 });
  }
}
